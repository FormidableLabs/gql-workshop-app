import React, { useContext } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from 'urql';
import { AuthContext } from './Login';

const AddToFavorites = gql`
  mutation($id: ID!) {
    addToFavorites(input: { id: $id }) {
      id
      isFavorite
    }
  }
`;
const RemoveFromFavorites = gql`
  mutation($id: ID!) {
    removeFromFavorites(input: { id: $id }) {
      id
      isFavorite
    }
  }
`;

const Favorite = ({ selected, movieId }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [, addToFavorites] = useMutation(AddToFavorites);
  const [, removeFromFavorites] = useMutation(RemoveFromFavorites);
  return (
    <i
      className={classnames('fa-star', {
        fas: selected,
        far: !selected,
      })}
      onClick={(e) => {
        e.preventDefault();
        if (isLoggedIn) {
          selected ? removeFromFavorites({ id: movieId }) : addToFavorites({ id: movieId });
        }
      }}
    />
  );
};

Favorite.propTypes = {
  selected: PropTypes.bool,
  movieId: PropTypes.string,
};

export default Favorite;
