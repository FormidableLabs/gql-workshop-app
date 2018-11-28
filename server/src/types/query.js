// const isemail = require('isemail');
const { GraphQLDate } = require('graphql-iso-date');

module.exports = {
  Date: GraphQLDate,

  Query: {
    genre: (_, { id }, { apiClient }) => {
      return apiClient
        .load(['genre/movie/list'])
        .then(res => res.data.genres)
        .then(genres => genres.find(genre => genre.id === parseInt(id)));
    },
    movies: (_, { page = 1 }, { apiClient }) => {
      return apiClient
        .load([
          'discover/movie',
          {
            params: {
              page
            }
          }
        ])
        .then(res => res.data.results);
    },
    movie: (_, { id }, { apiClient }) => {
      return apiClient.load([`movie/${id}`]).then(res => res.data);
    },
    favorites: (_, __, { apiClient, favoritesStore }) => {
      return Promise.all(
        Array.from(favoritesStore).map(id => apiClient.load([`movie/${id}`]).then(res => res.data))
      );
    }
  }
};
