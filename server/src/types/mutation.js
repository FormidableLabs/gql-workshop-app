const isemail = require('isemail');

module.exports = {
  Mutation: {
    login: (_, { email }) => {
      if (!isemail.validate(email)) {
        throw new Error('Invalid email');
      }
      return {
        token: new Buffer(email).toString('base64')
      };
    },

    addToFavorites: (root, { input: { id } }, { apiClient, isLoggedIn, favoritesStore }) => {
      if (!isLoggedIn) {
        throw new Error('Invalid Access: Not logged in');
      }

      favoritesStore.add(id);
      return apiClient.load([`movie/${id}`]).then(res => res.data);
    },

    removeFromFavorites: (root, { input: { id } }, { apiClient, isLoggedIn, favoritesStore }) => {
      if (!isLoggedIn) {
        throw new Error('Invalid Access: Not logged in');
      }

      favoritesStore.delete(id);
      return apiClient.load([`3/movie/${id}`]).then(res => res.data);
    }
  }
};
