import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      firstName
      lastName
      email
    }
  }
`;
export const GET_USER_PRODUCTS = gql`
  query GetUserProducts($userID: ID!) {
    getUserProducts(userID: $userID) {
      _id
      name
      description
      image
      condition
      price
      createdBy
      community
    }
  }
`;

export const GET_USER_WATCHLIST = gql`
  query GetUserWatchlist($userID: ID!) {
    getUserWatchlist(userID: $userID) {
      _id
      name
      description
      image
      condition
      price
      createdBy
      community
    }
  }
`;

export const GET_USER_COMMUNITIES = gql`
  query GetUserCommunities($userID: ID!) {
    getUserCommunities(userID: $userID) {
      _id
      name
      description
      location
      image
      users
      createdBy
    }
  }
`;

export const GET_OTHER_COMMUNITIES = gql`
  query GetOtherCommunities {
    getOtherCommunities {
      _id
      name
      description
      location
      image
      users
      createdBy
    }
  }
`;