import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    this.state = {
      isLoggedIn: !!token
    };
  }

  handleLogin = e => {
    e.preventDefault();
    const email = this.input.value;
    this.props
      .mutate({
        variables: {
          email
        }
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.login.token);
      })
      .then(() => this.setState({ isLoggedIn: true }));
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false }, () => localStorage.clear());
  };

  render() {
    return (
      <div className="login">
        {this.state.isLoggedIn ? (
          <button className="button" onClick={this.handleLogout}>
            Log out
          </button>
        ) : (
          <form onSubmit={this.handleLogin}>
            <input type="text" ref={ref => (this.input = ref)} placeholder="Email" />
            <button className="button">Log in</button>
          </form>
        )}
      </div>
    );
  }
}

const withLogin = graphql(gql`
  mutation Login($email: String!) {
    login(email: $email) {
      token
    }
  }
`);

export default withLogin(Login);
