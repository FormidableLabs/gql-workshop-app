import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

const authLink = new ApolloLink((operation, forward) => {
  const context = operation.getContext()
  const nextContext = {
    ...context,
    headers: {
      ...context.headers,
      authorization: localStorage.getItem('token')
    }
  }
  operation.setContext(nextContext);

  return forward(operation);
})

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new BatchHttpLink({
      uri: 'http://localhost:3001/graphql'
    })
  ]),
  cache: new InMemoryCache()
});

export default client;