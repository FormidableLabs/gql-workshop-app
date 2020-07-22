import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Favorite from '../Favorite';
import './movieCard.css';

const MovieCard = ({
  addToFavorites,
  id,
  posterPath,
  title,
  releaseDate,
  overview,
  isFavorite,
}) => {
  return (
    <div>
      <Link to={`/movie/${id}`} className="movieCard">
        <img className="cardImage" src={posterPath} alt={title} />
        <div className="cardDetails">
          <h2 className="cardTitle">
            {title} <Favorite movieId={id} selected={isFavorite} />
          </h2>
          <span className="releaseDate">{releaseDate}</span>
          <p className="cardOverview">{overview}</p>
        </div>
      </Link>
    </div>
  );
};

MovieCard.fragment = gql`
  fragment MovieCard on Movie {
    id
    title
    posterPath(size: MEDIUM)
    releaseDate
    overview
    isFavorite
  }
`;

export default MovieCard;
