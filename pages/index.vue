<template>
  <div>
    <amplify-authenticator>
    <v-row v-if="userData">
    <v-col cols="3" >
        <v-navigation-drawer
          permanent
          expand-on-hover
        >
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  チーム亀田
                </v-list-item-title>
                <v-list-item-subtitle>xxxx@gmail.com</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list
            nav
            dense
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Voice Data</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>My Team</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Starred</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    </v-col>
    <v-col cols="9" sm="8" md="6">
     <v-container
        class="py-8 px-6"
        fluid
      >
      <v-row>
        <v-col cols="12">
          <v-card>
             <v-card-title class="text-h5">
                Transcribe Your Voice
              </v-card-title>
              <v-card-subtitle>
                {{ interval.toFixed(2) }}
              </v-card-subtitle>
              <v-card-actions>
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
              </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="result">
          <v-card>
            <v-card-subtitle class="red--text text--lighten-1">
                {{resultStatus}}
            </v-card-subtitle>
            <v-card-text>
              <div class="my-4 text-subtitle-1">
                テキスト解析
              </div>
              <v-textarea
                solo
                :value="result.transcripts[0].transcript"
                name="input-7-4"
                label="Solo textarea"
              ></v-textarea>
            </v-card-text>
            <v-card-text>
              <div class="my-4 text-subtitle-1">
                時系列解析
              </div>
              <v-textarea
                solo
                :value="JSON.stringify(result.items)"
                name="input-7-4"
                label="Solo textarea"
              ></v-textarea>
            </v-card-text>
          </v-card>
        </v-col>     
          <v-col cols="12">
            <v-card>
              <v-subheader>Today</v-subheader>

              <v-list two-line>
                  <v-list-item>
                    <v-list-item-avatar color="grey darken-1">
                      <v-avatar
                      color="teal"
                      size="48"
                    >
                      <span class="white--text text-h5">48</span>
                    </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Voice 1</v-list-item-title>

                      <v-list-item-subtitle>
                        「人工心臓に興味あって」“ガチ”小6男子の町工場見学がすごい…1本の電話から実現までの顛末を聞いた
                      </v-list-item-subtitle>
                      <v-rating
                        v-model="rating"
                        background-color="orange lighten-3"
                        color="orange"
                        large
                      ></v-rating>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>
                  <v-list-item>
                    <v-list-item-avatar color="grey darken-1">
                      <v-avatar
                      color="orange"
                      size="48"
                    >
                      <span class="white--text text-h5">99</span>
                    </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Voice 2</v-list-item-title>

                      <v-list-item-subtitle>
                        始まりは試作開発・治具製作などを手掛ける安久工機にかかってきた、見学依頼の電話だった。
                      </v-list-item-subtitle>
                      <v-rating
                        v-model="rating2"
                        background-color="orange lighten-3"
                        color="orange"
                        large
                      ></v-rating>
                    </v-list-item-content>
                  </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-subheader>Yesterday</v-subheader>

              <v-list two-line>
                  <v-list-item>
                    <v-list-item-avatar color="grey darken-1">
                      <v-avatar
                      color="teal"
                      size="48"
                    >
                      <span class="white--text text-h5">70</span>
                    </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Voice 3</v-list-item-title>

                      <v-list-item-subtitle>
                        「日々仕事で使う方も多いExcel、ショートカットキーを活用すれば大幅に効率を上げられることも。Excelスキル術をわかりやすく図解で発信する
                      </v-list-item-subtitle>
                      <v-rating
                        v-model="rating"
                        background-color="orange lighten-3"
                        color="orange"
                        large
                      ></v-rating>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider>
                  <v-list-item>
                    <v-list-item-avatar color="grey darken-1">
                      <v-avatar
                      color="orange"
                      size="48"
                    >
                      <span class="white--text text-h5">82</span>
                    </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Voice 2</v-list-item-title>

                      <v-list-item-subtitle>
                        夏も終わりに近づいているが、今年は「花火」を見ただろうか？ そんな中で今、Twitterに投稿された4歳娘が撮影した楽しくなる花火の写真が
                      </v-list-item-subtitle>
                      <v-rating
                        v-model="rating2"
                        background-color="orange lighten-3"
                        color="orange"
                        large
                      ></v-rating>
                    </v-list-item-content>
                  </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-col cols="12">
          <amplify-sign-out></amplify-sign-out>
        </v-col>
      </v-container>
    </v-col>
  </v-row>
  </amplify-authenticator>
  </div>
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
    interval : 0,
    userData: {},
    cards: ['Today', 'Yesterday'],
    rating: 3,
    rating2: 5
  }),
  // async beforeCreate() {
  //   try {
  //     // Amplify JavaScript library - Auth Class
  //     // https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#currentauthenticateduser
  //     // ログインステータスの取得
  //     // this.userData = await Auth.currentAuthenticatedUser()
  //     this.signInStatus = 'signedIn'
  //   } catch (err) {
  //     this.signInStatus = 'signedOut'
  //   }
  //   // Vue - Amplify Plugin - AmplifyEventBus
  //   // authStateイベント のリッスン
  //   // https://aws-amplify.github.io/docs/js/vue#amplifyeventbus
  //   AmplifyEventBus.$on('authState', info => {
  //     switch (info) {
  //       case 'signedIn':
  //         this.signInStatus = 'signedIn'
  //         break
  //       default:
  //         this.signInStatus = 'signedOut'
  //         break
  //     }
  //   });
  // },
  async mounted() {
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
        if(result?.data?.getTranscribe){
          this.resultStatus = result.data.getTranscribe.status
          const output = JSON.parse(result.data.getTranscribe.output)
          this.result = output.results
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
