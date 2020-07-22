import React from 'react';
import gql from 'graphql-tag';
import numeral from 'numeral';
import { useQuery } from 'urql';

import './movie.css';
import Favorite from '../../components/Favorite';

const Detail = ({ label, value }) => {
  return (
    <div className="detailContainer">
      <div>{label}</div>
      <div className="detailValue">{value}</div>
    </div>
  );
};

const Movie = ({ match }) => {
  const [res] = useQuery({
    query: MOVIE_QUERY,
    variables: {
      movieId: match.params.id,
    },
  });

  if (res.error) {
    return null;
  }

  if (res.fetching && !res.data) {
    return null;
  }

  const {
    id,
    title,
    posterPath,
    backdropPath,
    tagline,
    overview,
    releaseDate,
    runtime,
    revenue,
    voteAverage,
    isFavorite,
  } = res.data.movie;

  return (
    <div className="backgroundContainer" style={{ backgroundImage: `url(${backdropPath})` }}>
      <div className="container">
        <div className="posterContainer">
          <img className="poster" src={posterPath} alt={title} />
        </div>
        <div className="movieInfo">
          <h1 className="title">
            {title} <Favorite movieId={id} selected={isFavorite} />
          </h1>
          <span className="tagline">{tagline}</span>
          <p>{overview}</p>
          <div className="details">
            <Detail label="Original Release" value={releaseDate} />
            <Detail label="Running Time" value={`${runtime} mins`} />
            <Detail label="Box Office" value={numeral(revenue).format('$0,0')} />
            <Detail label="Rating" value={`${voteAverage}/10`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MOVIE_QUERY = gql`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      backdropPath
      posterPath(size: MEDIUM)
      tagline
      overview
      releaseDate
      voteAverage
      runtime
      revenue
      isFavorite
    }
  }
`;

export default Movie;
