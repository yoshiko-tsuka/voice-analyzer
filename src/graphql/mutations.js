/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTranscribe = /* GraphQL */ `
  mutation CreateTranscribe(
    $input: CreateTranscribeInput!
    $condition: ModeltranscribeConditionInput
  ) {
    createTranscribe(input: $input, condition: $condition) {
      id
      status
      output
      createdAt
      updatedAt
    }
  }
`;
export const updateTranscribe = /* GraphQL */ `
  mutation UpdateTranscribe(
    $input: UpdateTranscribeInput!
    $condition: ModeltranscribeConditionInput
  ) {
    updateTranscribe(input: $input, condition: $condition) {
      id
      status
      output
      createdAt
      updatedAt
    }
  }
`;
export const deleteTranscribe = /* GraphQL */ `
  mutation DeleteTranscribe(
    $input: DeleteTranscribeInput!
    $condition: ModeltranscribeConditionInput
  ) {
    deleteTranscribe(input: $input, condition: $condition) {
      id
      status
      output
      createdAt
      updatedAt
    }
  }
`;
