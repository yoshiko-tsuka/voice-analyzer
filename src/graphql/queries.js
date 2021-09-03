/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTranscribe = /* GraphQL */ `
  query GetTranscribe($id: ID!) {
    getTranscribe(id: $id) {
      id
      status
      output
      createdAt
      updatedAt
    }
  }
`;
export const listTranscribes = /* GraphQL */ `
  query ListTranscribes(
    $filter: ModeltranscribeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTranscribes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        output
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
