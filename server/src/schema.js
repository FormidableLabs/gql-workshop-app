const { makeExecutableSchema } = require('graphql-tools');
const mergeSchema = require('./types');
const axios = require('./axios');

const typeDefs = [
  `
  type Query {
    version: String!
  }
`
];

const resolvers = {
  Query: {
    version: () => '1'
  }
};

module.exports = {
  schema: makeExecutableSchema(mergeSchema({ typeDefs, resolvers })),
  context: req => {
    return {
      axios
    };
  }
};
