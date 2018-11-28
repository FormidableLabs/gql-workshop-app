import React, { Component } from 'react';
import numeral from 'numeral';
import { withProps } from 'recompose';

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
  }
}

/**
 * TODO
 *   - Create query HOC
 *   - Get movieId from router params
 *   - Extract props from data
 */

const withData = withProps(() => ({
  movie: {
    id: '284054',
    title: 'Black Panther',
    posterPath: 'https://image.tmdb.org/t/p/w500/bLBUCtMQGJclH36clliPLmljMys.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg',
    tagline: 'Long live the king',
    overview:
      "After the events of Captain America: Civil War, King T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war.",
    releaseDate: '2018-02-13',
    runtime: 134,
    revenue: 704000422,
    voteAverage: 7.4,
    isFavorite: false
  },
  loading: false
}));

export default withData(Movie);
