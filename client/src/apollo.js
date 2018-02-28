import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new BatchHttpLink({
    uri: 'http://localhost:3001/graphql'
  }),
  cache: new InMemoryCache()
});

export default client;