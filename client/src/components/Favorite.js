import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { MOVIES_QUERY } from '../screens/MoviesScreen';

const Favorite = ({
  selected,
  addToFavorites = () => { },
  removeFromFavorites = () => { }
}) => {
  return <i className={classnames("fa-star", {
    fas: selected,
    far: !selected
  })} onClick={(e) => {
    e.preventDefault();
    selected ? removeFromFavorites() : addToFavorites();
  }} />
}

Favorite.propTypes = {
  selected: PropTypes.bool,
  addToFavorites: PropTypes.func
}

/**
 * TODO
 *   - Create HOC mutation
 *   - Update query cache with writeQuery
 *   - Add writeFragment for global movie updates
 *   - Add an optimistic response
 * 
 *  Then do the same for removing favorites!
 */

const withAddToFavorites = graphql(gql`
  mutation($id: ID!) {
    addToFavorites(input: { id: $id }) {
      id
      isFavorite
    }
  }
`, {
    props: ({ mutate, ownProps: { movieId } }) => {
      return {
        addToFavorites: () => mutate({
          variables: {
            id: movieId
          },
          optimisticResponse: {
            __typename: "Mutation",
            addToFavorites: {
              __typename: 'Movie',
              id: movieId,
              isFavorite: true
            }
          },
          update: (cache, { data: { addToFavorites: movie } }) => {
            const data = cache.readQuery({
              query: MOVIES_QUERY
            });
            const hasMovie = data.favorites.some(({ id }) => id === movieId);

            if (!hasMovie) {
              data.favorites.push(movie);

              cache.writeQuery({
                query: MOVIES_QUERY,
                data
              })
            }
          }
        })
      }
    }
  });

const withRemoveFromFavorites = graphql(gql`
  mutation($id: ID!) {
    removeFromFavorites(input: { id: $id }) {
      id
      isFavorite
    }
  }
`, {
    props: ({ mutate, ownProps: { movieId } }) => {
      return {
        removeFromFavorites: () => mutate({
          variables: {
            id: movieId
          },
          optimisticResponse: {
            __typename: "Mutation",
            removeFromFavorites: {
              __typename: 'Movie',
              id: movieId,
              isFavorite: true
            }
          },
          update: (cache, { data: { removeFromFavorites: movie } }) => {
            const data = cache.readQuery({
              query: MOVIES_QUERY
            });

            data.favorites = data.favorites.reduce((favorites, movie) => {
              if (movie.id === movieId) return favorites;
              return [...favorites, movie];
            }, []);

            cache.writeQuery({
              query: MOVIES_QUERY,
              data
            })
          }
        })
      }
    }
  });
export default compose(withAddToFavorites, withRemoveFromFavorites)(Favorite);