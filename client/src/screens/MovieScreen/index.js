import React, { Component } from 'react';
import gql from 'graphql-tag';
import numeral from 'numeral';
import { Query } from 'react-apollo';

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

class Movie extends Component {
  render() {
    const {
      movie: {
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
        isFavorite
      } = {},
      loading
    } = this.props;

    if (loading) return null;

    return (
      <div className="backgroundContainer" style={{ backgroundImage: `url(${backdropPath})` }}>
        >
        <div className="container">
          <div className="posterContainer">
            <img className="poster" src={posterPath} />
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
  }
}

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

/**
 * TODO
 *   - Create query HOC
 *   - Get movieId from router params
 *   - Extract props from data
 */
class MovieWithData extends Component {
  render() {
    return (
      <Query
        query={MOVIE_QUERY}
        variables={{
          // Get the movie ID from React Router navigation props
          movieId: this.props.match.params.id
        }}
      >
        {props => {
          return <Movie movie={props.data.movie} loading={props.loading} />;
        }}
      </Query>
    );
  }
}

export default MovieWithData;
