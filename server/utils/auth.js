const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // just incase we decide to use env variables

const secret = process.env.JWT_SECRET || 'mysecretssshhhhhhh';
const expiration = process.env.JWT_EXPIRATION || '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  // verify the token and add the user to the request context
  authMiddleware: ({ req }) => {
    let token = req.headers.authorization || '';

    if (token) {
      try {
        // Remove "Bearer " if present
        token = token.split(' ').pop().trim();
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');
        throw new GraphQLError('Invalid token', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        });
      }
    } else {
      console.log('No token provided');
      throw new GraphQLError('No token provided', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
    return req;
  },

};
