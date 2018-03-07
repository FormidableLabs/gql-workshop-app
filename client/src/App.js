import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import client from './apollo';
import Login from './components/Login';
import MovieScreen from './screens/MovieScreen';
import MoviesScreen from './screens/MoviesScreen';
import FavScreen from './screens/FavScreen';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div style={{ height: '100%' }}>
          <Login />
          <Router>
            <Switch>
              <Route exact path="/" component={MoviesScreen} />
              <Route path="/favorites" component={FavScreen} />
              <Route path="/movie/:id" component={MovieScreen} />
            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
