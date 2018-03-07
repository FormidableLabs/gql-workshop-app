import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  request: operation => {
    const context = operation.getContext();
    const nextContext = {
      ...context,
      headers: {
        ...context.headers,
        authorization: localStorage.getItem('token'),
      },
    };
    operation.setContext(nextContext);
  },
});

export default client;
