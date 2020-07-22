import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

import Login, { AuthProvider } from './components/Login';
import MovieScreen from './screens/MovieScreen';
import MoviesScreen from './screens/MoviesScreen';

const client = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          addToFavorites: (result, args, cache, info) => {
            cache.updateQuery(
              {
                query: `
                  query {
                    favorites {
                      id
                    }
                  }
                `,
              },
              (data) => {
                if (data.favorites) {
                  data.favorites.push(result.addToFavorites);
                }
                return data;
              }
            );
          },
          removeFromFavorites: (result, args, cache, info) => {
            cache.updateQuery(
              {
                query: `
                  query {
                    favorites {
                      id
                    }
                  }
                `,
              },
              (data) => {
                if (data.favorites) {
                  data.favorites = data.favorites.filter(
                    ({ id }) => id !== result.removeFromFavorites.id
                  );
                }
                return data;
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: () => {
    return {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    };
  },
});

const App = () => {
  return (
    <Provider value={client}>
      <AuthProvider>
        <div style={{ height: '100%' }}>
          <Login />
          <Router>
            <Switch>
              <Route exact path="/" component={MoviesScreen} />
              <Route path="/movie/:id" component={MovieScreen} />
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    </Provider>
  );
};

export default App;
