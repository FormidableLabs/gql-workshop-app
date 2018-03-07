import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import MovieCard from './MovieCard';

/*
You may be asking yourself, why do I need the MovieCard fragment just to display a count?
The reason why is because the favorites list reuses the same query.
This is so you don't have to update TWO queries
in the addToFavorites and removeFromFavorites mutation update functions.
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

const FavCount = graphql(FAVORITES_QUERY, {
  props: ({ data: { favorites = [] } }) => ({ count: favorites.length }),
})(({ count }) => {
  return (
    <div className="favCount">
      <i className="fas fa-star fa-2x" />
      {count !== 0 && (
        <div>
          <i className="fas fa-circle" />
          <span className="favCountValue">{count}</span>
        </div>
      )}
    </div>
  );
});

export default FavCount;
