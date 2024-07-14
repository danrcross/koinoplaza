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
