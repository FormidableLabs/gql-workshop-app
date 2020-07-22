import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';
import MovieCard from '../../components/MovieCard';
import './moviesScreen.css';

export const FAVORITES_QUERY = gql`
  query Favorites {
    favorites {
      id
    }
  }
`;

const FavCount = () => {
  const [res] = useQuery({ query: FAVORITES_QUERY });
  if (!res.data) return null;
  return (
    <div className="favCount">
      <i className="fas fa-star fa-2x" />
      <i className="fas fa-circle" />
      <span className="favCountValue">{res.data.favorites.length}</span>
    </div>
  );
};

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const results = new Array(currentPage)
    .fill(null)
    .map((_, i) => <MovieResults key={i} page={i + 1} />);
  return (
    <div className="moviesScreen">
      <div className="header">
        <h1 className="moviesTitle">Discover</h1>
        <Link to="/favorites">
          <FavCount />
        </Link>
      </div>
      <div className="moviesResults">{results}</div>
      <button className="button" onClick={() => setCurrentPage((page) => page + 1)}>
        Load More
      </button>
    </div>
  );
};

export const MOVIES_QUERY = gql`
  query Movies($page: Int) {
    movies(page: $page) {
      id
      ...MovieCard
    }
  }
  ${MovieCard.fragment}
`;

const MovieResults = ({ page }) => {
  const [res] = useQuery({
    query: MOVIES_QUERY,
    variables: { page },
  });

  if (!res.data) return null;

  const movies = res.data && res.data.movies;
  return (
    <>
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </>
  );
};

export default Movies;
