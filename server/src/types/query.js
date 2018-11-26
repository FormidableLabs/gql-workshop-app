const { GraphQLDate } = require('graphql-iso-date');

module.exports = {
  Date: GraphQLDate,
  Query: {
    movies: (_, { page = 1 }, { apiClient }) => {
      return apiClient
        .get('discover/movie', {
          params: {
            page
          }
        })
        .then(res => res.data.results);
    },
    movie: (_, { id }, { apiClient }) => {
      return apiClient.get(`movie/${id}`).then(res => res.data);
    }
  }
};
