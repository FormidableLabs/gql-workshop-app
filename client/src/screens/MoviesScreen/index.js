import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import './moviesScreen.css';

import MovieCard from '../../components/MovieCard';

const FavCount = ({ count }) => {
  return (
    <div className="favCount">
      <i className="fas fa-star fa-2x" />
      <i className="fas fa-circle" />
      <span className="favCountValue">{count}</span>
    </div>
  );
};

const Movies = ({ movies, favorites, loading, loadMore }) => {
  if (loading) return null;

  return (
    <div className="moviesScreen">
      <div className="header">
        <h1 className="moviesTitle">Discover</h1>
        <Link to="/favorites">
          <FavCount count={favorites.length} />
        </Link>
      </div>
      <div className="moviesResults">
        {movies.map(movie => (
          <MovieCard key={movie.id} {...movie} />
        ))}
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

class MoviesWithData extends React.Component {
  loadMore = (moviesCount, fetchMore) => {
    const nextPage = Math.floor(moviesCount / 20) + 1;
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
  };

  render() {
    return (
      <Query query={MOVIES_QUERY}>
        {props => {
          const moviesCount = (props.data.movies || []).length;
          return (
            <Movies
              movies={props.data.movies}
              favorites={props.data.favorites}
              loading={props.loading}
              loadMore={() => this.loadMore(moviesCount, props.fetchMore)}
            />
          );
        }}
      </Query>
    );
  }
}

export default MoviesWithData;
