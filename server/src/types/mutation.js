const isemail = require('isemail');
const { GraphQLError } = require('graphql');

module.exports = {
  Mutation: {
    login: (_, { email }) => {
      if (!isemail.validate(email)) {
        throw new GraphQLError('Invalid email address');
      }
      return {
        token: Buffer.from(email).toString('base64'),
      };
    },

    addToFavorites: (_, { input: { id } }, { apiClient, favoritesStore }) => {
      favoritesStore.add(id);
      return apiClient.load([`movie/${id}`]).then((res) => res.data);
    },

    removeFromFavorites: (_, { input: { id } }, { apiClient, favoritesStore }) => {
      favoritesStore.delete(id);
      return apiClient.load([`movie/${id}`]).then((res) => res.data);
    },
  },
};
