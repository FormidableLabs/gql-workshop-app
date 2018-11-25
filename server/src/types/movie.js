module.exports = {
  Movie: {
    posterPath: (root, { size = 'w500' }) => {
      return `https://image.tmdb.org/t/p/${size}${root.posterPath}`;
    },
    backdropPath: root => {
      return `https://image.tmdb.org/t/p/w1280${root.backdropPath}`;
    }
  }
};
