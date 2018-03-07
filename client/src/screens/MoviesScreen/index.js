import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withProps } from 'recompose';
import './moviesScreen.css';

import MovieCard from '../../components/MovieCard';

const FavCount = ({ count }) => {
  return <div className="favCount">
    <i className="fas fa-star fa-2x" />
    <i className="fas fa-circle" />
    <span className="favCountValue">{count}</span>
  </div>
}

const Movies = ({ movies, favorites, loading, loadMore }) => {
  if (loading) return null;

  return (
    <div className="moviesScreen">
      <div className="header">
        <h1 className="moviesTitle">Discover</h1>
        <Link to="/favorites" ><FavCount count={favorites.length} /></Link>
      </div>
      <div className="moviesResults">
        {movies.map(movie => <MovieCard key={movie.id} {...movie} />)}
      </div>
      <button className="button" onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

/**
 * TODO
 *   - Create HOC graphql component
 *   - Query for data required by movieCard
 *   - Extract movieCard query into a fragment on MovieCard
 *   - Expose relevant props from `data`
 *   - Add pagination using FetchMore
 */


export const MOVIES_QUERY = gql`
  query Movies($page: Int) {
      movies(page: $page) @connection(key: "Movies") {
        id
        ...MovieCard
      }
      favorites {
        id
      }
  }
  ${MovieCard.fragment}
`;

const withData = graphql(
  MOVIES_QUERY,
  {
    props: ({ data: { movies, loading, favorites, fetchMore } }) => {
      return {
        movies,
        favorites,
        loading,
        loadMore: () => {
          const nextPage = Math.floor(movies.length / 20) + 1;
          return fetchMore({
            variables: {
              page: nextPage
            },
            /**
             * The first argument contains the list of movies already fetched and stored in the cache.
             * The second argument contains the next page of movies.
             *
             * It's our responsibility to return an updated result to be persisted to the cache
             * and the place to do that is in UpdateQuery.
             */
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }
              return Object.assign({}, previousResult, {
                // Append the new feed results to the old one
                movies: [...previousResult.movies, ...fetchMoreResult.movies]
              });
            }
          });
        }
      }
    }
  }
);

export default withData(Movies);
