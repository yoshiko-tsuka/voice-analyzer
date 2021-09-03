<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
     <amplify-authenticator>
     <div class="text-center mb-8">
        <h1>Voice Recorder</h1>
        <v-btn
          color="error"
          :loading="loading"
          v-if="status=='ready'"
          @click="startRecording"
        >
          Record
        </v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          v-if="status=='recording'"
          @click="stopRecording"
        >
          Stop
        </v-btn>
        <div class="time">
          {{ interval.toFixed(2) }}
        </div>
        <div class="red--text text--lighten-1">{{resultStatus}}</div>
        <div>{{result}}</div>
      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
    </v-col>
  </v-row>
</template>

<script>
import { API, Storage } from "aws-amplify";
import { getTranscribe, listTranscribes } from "../src/graphql/queries";
import { createTranscribe } from "../src/graphql/mutations";

export default {
  data: () => ({
    status: 'init',
    recorder: null,
    audioData: [],
    audioExtension: '',
    bucketName: 'transcribe-womens-hackathon-input',
    result: '',
    resultStatus: '',
    loading: false,
    active : false,
    start : 0,
    timer : 0,
    interval : 0
  }),
  mounted() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('dataavailable', e => {
            this.audioData.push(e.data);
            this.audioExtension = this.getExtension(e.data.type)
        });
        this.recorder.addEventListener('stop', async () => {
            this.loading = true
            const id = new Date().getTime().toString(16)
            const s3key = id + this.audioExtension
            const audioBlob = new Blob(this.audioData);
            await Storage.put(s3key, audioBlob, { level: "private", })
            .then(async (result) => {
              await this.fetchTranscribe(id)
            })
            // const audioBlob = new Blob(this.audioData);
            // const url = URL.createObjectURL(audioBlob);
            // let a = document.createElement('a');
            // a.href = url;
            // a.download = Math.floor(Date.now() / 1000) + this.audioExtension;
            // document.body.appendChild(a);
            // a.click();
        });
        this.status = 'ready';
    });
  },
  methods: {
    count: function() {
      if (this.sec <= 59) {
        this.min++
        this.sec = 0
      } else {
        this.sec++
      }
    },
    startRecording() {
        this.interval = 0;
        this.start = Date.now();
        this.status = 'recording';
        this.audioData = [];
        this.recorder.start();
    },
    stopRecording() {
        this.recorder.stop();
        this.active = true;
        this.start = Date.now();
        this.timer = setInterval(()=>{ this.interval = (Date.now() - this.start) * 0.001;}, 10); // 10msごとに現在時刻とstartを押した時刻の差を足す
        this.status = 'ready';
    },
    getExtension(audioType) {
        let extension = 'wav';
        const matches = audioType.match(/audio\/([^;]+)/);
        if(matches) {
            extension = matches[1];
        }
        return '.'+ extension;
    },
    async fetchTranscribe(id){
      this.result = ''
      this.resultStatus = ''
      await API.graphql({
        query: getTranscribe,
        variables: { id: id }
      })
      .then(async (result) => {
        if(result.data.getTranscribe){
          this.result = result.data.getTranscribe.output
          this.resultStatus = result.data.getTranscribe.status
          this.active = false;
          clearInterval(this.timer);
          this.loading = false
        }else {
          await this.fetchTranscribe(id)
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>
