const { makeExecutableSchema } = require('graphql-tools');
const isemail = require('isemail');
const mergeSchema = require('./types');
const axios = require('./axios');
const makeLoaders = require('./loaders')

const { GraphQLDate } = require('graphql-iso-date');

const typeDefs = [
  `
  scalar Date

  type Query {
    version: String!
  }

  type LoginResponse {
    token: String!
  }

  type Mutation {
    noop: String
    login(email: String!): LoginResponse
  }
`
];

const resolvers = {
  Date: GraphQLDate,
  Query: {
    version: () => '1'
  },
  Mutation: {
    login: (_, { email }) => {
      if (!isemail.validate(email)) {
        throw new Error('Invalid email');
      }
      return {
        token: new Buffer(email).toString('base64')
      };
    }
  }
};

module.exports = {
  schema: makeExecutableSchema(mergeSchema({ typeDefs, resolvers })),
  context: req => {
    return {
      isLoggedIn: !!req.email,
      loaders: makeLoaders()
    };
  }
};
