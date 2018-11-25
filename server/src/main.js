const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { importSchema } = require('graphql-import');
const apiClient = require('./axios');

const typeDefs = importSchema('./src/schema/schema.graphql');
const resolvers = require('./types');

const PORT = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  context: ({ req }) => {
    return {
      apiClient
    };
  },
  playground: {
    endpoint: '/graphql'
  }
});

server.applyMiddleware({ app, bodyParserConfig: true });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
