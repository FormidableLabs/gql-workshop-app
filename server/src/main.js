const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const isemail = require('isemail');
const makeApiClient = require('./apiClient');
const { importSchema } = require('graphql-import');

const typeDefs = importSchema('./src/schema/schema.graphql');
const resolvers = require('./types');

const PORT = 3001;

const app = express();

/**
 *  Mock Authentication Middleware
 */
app.use((req, _, next) => {
  const auth = req.headers.authorization || '';
  const email = Buffer.from(auth, 'base64').toString('utf8');

  if (isemail.validate(email)) {
    req.email = email;
  }

  return next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  context: ({ req }) => {
    return {
      isLoggedIn: !!req.email,
      apiClient: makeApiClient(),
      favoritesStore: require('./favoritesStore')
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
