const { makeExecutableSchema } = require('graphql-tools');
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
`
];

const resolvers = {
  Date: GraphQLDate,
  Query: {
    version: () => '1'
  }
};

module.exports = {
  schema: makeExecutableSchema(mergeSchema({ typeDefs, resolvers })),
  context: req => {
    return {
      axios,
      loaders: makeLoaders()
    };
  }
};
