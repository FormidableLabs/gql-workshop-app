import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import numeral from 'numeral';

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
        isFavorite,
      } = {},
      loading,
    } = this.props;

    if (loading) return null;

    return (
      <div
        className="backgroundContainer"
        style={{ backgroundImage: `url(${backdropPath})` }}
      >
        >
        <div className="container">
          <div className="posterContainer">
            <img alt="poster" className="poster" src={posterPath} />
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
              <Detail
                label="Box Office"
                value={numeral(revenue).format('$0,0')}
              />
              <Detail label="Rating" value={`${voteAverage}/10`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * TODO
 *   - Create query HOC
 *   - Get movieId from router params
 *   - Extract props from data
 */

const withData = graphql(
  gql`
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
  `,
  {
    options: ({ match: { params: { id } } }) => {
      return {
        variables: {
          movieId: id,
        },
      };
    },
    props: ({ data: { movie, loading } }) => {
      return {
        movie,
        loading,
      };
    },
  },
);

export default withData(Movie);
