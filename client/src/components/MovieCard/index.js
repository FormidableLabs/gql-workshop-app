import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Favorite from '../Favorite';
import './movieCard.css';

import { FAVES_QUERY } from '../../screens/MoviesScreen';

class MovieCard extends Component {

  handleFavClick = e => {
    e.preventDefault();
    this.props.addToFavorites();
  }

  render() {
    const { id, posterPath, title, releaseDate, overview, isFavorite } = this.props;
    return (
      <div>
        <Link to={`/movie/${id}`} className="movieCard">
          <img className="cardImage" src={posterPath} />
          <div className="cardDetails">
            <h2 className="cardTitle">{title} <Favorite movieId={id} selected={isFavorite} /></h2>
            <span className="releaseDate">{releaseDate}</span>
            <p className="cardOverview">{overview}</p>
          </div>
        </Link>
      </div>
    );
  };

}

/**
 * TODO
 *   - Colocate data requirements with component as fragment
 *   - Post an add to favorites mutation
 *     - Update cache for Movie and favorites
 *     - Add an optimistic response
 *   - Post a remove from favorites mutation
 *     - Update cache for Movie and favorites
 *     - Add an optimistic response
 */

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
