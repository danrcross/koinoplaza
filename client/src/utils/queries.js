import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      firstName
      lastName
      email
      location
      occupation
      image
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

export const PRODUCTS = gql`
  query Products {
    products {
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

export const SINGLE_PRODUCT = gql`
  query Product($productId: ID!) {
    product(productID: $productId) {
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
   query getUserCommunities($userID: ID!) {
    getUserCommunities(userID: $userID) {
      _id
      name
      location
      membership
      members {
        _id
      }
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
export const QUERY_SINGLE_COMMUNITY = gql`
  query getSingleCommunity($communityId: ID!) {
    community(communityId: $communityId) {
      _id
      name
      description
      location
      members {
        _id
        firstName
        lastName
      }
      myProducts {
        _id
        product
        condition
        price
        image
        seller {
          _id
          name
          rating
        }
      }
      commProducts {
        _id
        product
        condition
        price
        image
        seller {
          _id
          name
          rating
        }
      }
    }
  }
`;
