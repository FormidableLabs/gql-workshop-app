const axios = require('./axios');

module.exports = function makeLoaders() {
  return {
    genres: (() => {
      let genresPromise;
      return () => {
        if (!genresPromise) {
          genresPromise = new Promise((resolve, reject) => {
            return axios.get('3/genre/movie/list')
              .then(res => res.data.genres)
              .then(resolve)
              .catch(reject)
          });
        }
        return genresPromise;
      };
    })()
  }
};