import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $firstName: String!, $lastName: String!, $location: String!, $occupation: String!, $image: String!) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, location: $location, occupation: $occupation, image: $image) {
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

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession($productId: ID!) {
    createCheckoutSession(productId: $productId) {
      id
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
export const UNWATCH_WATCHLIST_ITEM = gql`
  mutation UnwatchWatchlistItem($id: ID!) {
    deleteWatchlistItem(id: $id) {
      id
    }
  }
`;

export const LEAVE_COMMUNITY = gql`
  mutation LeaveCommunity($userId: ID!, $communityId: ID!) {
  leaveCommunity(userID: $userId, communityID: $communityId) {
    _id
  }
}
`;

