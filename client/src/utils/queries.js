import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      _id
      firstName
      lastName
      email
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