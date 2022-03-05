import { gql } from "@apollo/client";

export const UPLOAD_PUBLICATION = gql`
  mutation uploadPublication($file: Upload) {
    uploadPublication(file: $file) {
      status
      urlPublication
    }
  }
`;

export const GET_PUBLICATIONS = gql`
  query getPublication($username: String!) {
    getPublications(username: $username) {
      id
      idUser
      file
    }
  }
`;

export const GET_PUBLICATIONS_FOLLOWS = gql`
  query getPublicationsFollows {
    getPublicationsFollows {
      id
      idUser {
        name
        username
        avatar
      }
      file
    }
  }
`;
