import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      idPublication
      comment
      createAt
    }
  }
`;
export const GET_COMMENTS = gql`
  query getComment($idPublication: ID) {
    getComment(idPublication: $idPublication) {
      idUser {
        username
        name
        avatar
      }
      comment
    }
  }
`;
export const GET_LAST_COMMENTS = gql`
  query getLastComments($idPublication: ID) {
    getLastComments(idPublication: $idPublication) {
      idPublication
      idUser {
        username
        name
      }
      comment
    }
  }
`;
