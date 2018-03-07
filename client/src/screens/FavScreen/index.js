import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import './favScreen.css';

import MovieCard from '../../components/MovieCard';
import FavoriteCount from '../../components/FavoriteCount';

const Favorites = ({ favorites, loading }) => {
  if (loading) return null;

  return (
    <div className="favsScreen">
      <div className="header">
        <h1 className="favsTitle">Favorites</h1>
        <Link to="/favorites">
          <FavoriteCount />
        </Link>
      </div>
      <div className="favsResults">
        {favorites.map(movie => <MovieCard key={movie.id} {...movie} />)}
      </div>
    </div>
  );
};

/**
 * TODO
 *   - Create HOC graphql component
 *   - Query for favorites and the data required by movieCard
 *   - Extract movieCard query into a fragment on MovieCard
 *   - Expose relevant props from `data`
 */

export const FAVORITES_QUERY = gql`
  {
    favorites {
      id
      ...MovieCard
    }
  }
  ${MovieCard.fragment}
`;

const withData = graphql(FAVORITES_QUERY, {
  props: ({ data: { loading, favorites } }) => {
    return {
      favorites,
      loading,
    };
  },
});

export default withData(Favorites);
