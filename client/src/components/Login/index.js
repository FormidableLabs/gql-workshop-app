import React, { useCallback, useRef, useState, createContext, useMemo, useContext } from 'react';
import gql from 'graphql-tag';
import './login.css';
import { useMutation } from 'urql';

const LoginMutation = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      token
    }
  }
`;

export const AuthContext = createContext(null);

const Login = () => {
  const inputRef = useRef();
  const { isLoggedIn, login, logout, loginError } = useContext(AuthContext);

  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();
      logout();
    },
    [logout]
  );

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      console.log(inputRef.current);
      login(inputRef.current.value);
    },
    [login]
  );

  return (
    <div className="login">
      {isLoggedIn ? (
        <button className="button" onClick={handleLogout}>
          Log out
        </button>
      ) : (
        <form onSubmit={handleLogin}>
          <input type="text" ref={inputRef} placeholder="Email" />
          <span>{loginError}</span>
          <button className="button">Log in</button>
        </form>
      )}
    </div>
  );
};

export const AuthProvider = ({ children }) => {
  const token = useRef(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token.current);
  const [loginError, setLoginError] = useState('');
  const [, login] = useMutation(LoginMutation);

  const handleLogin = useCallback(
    (email) => {
      login({ email }).then(({ data, error }) => {
        if (error) {
          setLoginError(error.graphQLErrors[0].message);
        } else {
          localStorage.setItem('token', data.login.token);
          setIsLoggedIn(true);
          setLoginError(null);
        }
      });
    },
    [login]
  );

  const handleLogout = useCallback((e) => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }, []);

  const providerValue = useMemo(
    () => ({
      isLoggedIn,
      loginError,
      login: handleLogin,
      logout: handleLogout,
    }),
    [isLoggedIn, loginError, handleLogin, handleLogout]
  );

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default Login;
