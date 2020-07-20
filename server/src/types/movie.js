module.exports = {
  PosterSize: {
    THUMB: 'w92',
    SMALL: 'w185',
    MEDIUM: 'w500',
    LARGE: 'w780',
    ORIGINAL: 'original',
  },
  Movie: {
    posterPath: (root, { size = 'w500' }) => {
      return `https://image.tmdb.org/t/p/${size}${root.posterPath}`;
    },
    backdropPath: (root) => {
      return `https://image.tmdb.org/t/p/w1280${root.backdropPath}`;
    },
    genres: ({ genreIds, genres }, _, { apiClient }) => {
      if (genres) {
        return genres;
      }

      return apiClient
        .load(['genre/movie/list'])
        .then((res) => res.data.genres)
        .then((genres) => genreIds.map((id) => genres.find((genre) => genre.id === id)));
    },
    cast: ({ id: movieId }, args, { apiClient }) => {
      return apiClient.load([`movie/${movieId}/credits`]).then((res) => res.data.cast);
    },
    isFavorite: ({ id }, _, { favoritesStore }) => {
      return favoritesStore.has(String(id));
    },
  },
};
