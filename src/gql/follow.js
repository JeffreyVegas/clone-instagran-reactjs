import { gql } from "@apollo/client";

export const FOLLOW = gql`
  mutation follow($username: String!) {
    follow(username: $username)
  }
`;
export const IS_FOLLOW = gql`
  query isFollow($username: String!) {
    isFollow(username: $username)
  }
`;
export const UN_FOLLOW = gql`
  mutation unFollow($username: String!) {
    unFollow(username: $username)
  }
`;
export const GET_FOLLOWERS = gql`
  query getFollowers($username: String!) {
    getFollowers(username: $username) {
      name
      username
      avatar
    }
  }
`;

export const GET_FOLLOWINGS = gql`
  query getFollowings($username: String!) {
    getFollowings(username: $username) {
      name
      username
      avatar
    }
  }
`;

export const GET_NO_FOLLOWINGS = gql`
  query getNoFollowings {
    getNoFollowings {
      name
      username
      avatar
    }
  }
`;
