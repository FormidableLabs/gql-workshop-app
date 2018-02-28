exports.type = `
  enum PosterSize {
    THUMB
    SMALL
    MEDIUM
    LARGE
    ORIGINAL
  }

  type Movie {
    id: ID!
    title: String!
    voteAverage: Float!
    posterPath(size: PosterSize): String!
    backdropPath: String!
    overview: String!
    tagline: String
    runtime: Int
    revenue: Int
    releaseDate: Date
    genres: [Genre!]
    cast: [Cast!]
    isFavorite: Boolean!
  }

  extend type Query {
    movie(id: ID!): Movie
    movies(page: Int): [Movie!]!
    favorites: [Movie!]!
  }

  input FavoriteInput {
    id: ID!
  }

  extend type Mutation {
    addToFavorites(input: FavoriteInput!): Movie
    removeFromFavorites(input: FavoriteInput!): Movie
  }
`;

// This will be a unique set of Movie ids
const favorites = new Set();

exports.resolvers = {
  PosterSize: {
    THUMB: 'w92',
    SMALL: 'w185',
    MEDIUM: 'w500',
    LARGE: 'w780',
    ORIGINAL: 'original'
  },
  Movie: {
    posterPath: (root, { size = "w500" }) => {
      return `https://image.tmdb.org/t/p/${size}${root.posterPath}`;
    },
    backdropPath: root => {
      return `https://image.tmdb.org/t/p/w1280${root.backdropPath}`;
    },
    genres: ({ genreIds, genres }, _, { loaders }) => {
      if (genres) {
        return genres;
      }

      return loaders.axios.load(['3/genre/movie/list'])
        .then(res => res.data.genres)
        .then(genres => genreIds.map(id => genres.find(genre => genre.id === id)));
    },
    cast: ({ id: movieId }, args, { loaders }) => {
      return loaders.axios.load([`3/movie/${movieId}/credits`]).then(res => res.data.cast);
    },
    isFavorite: ({ id }) => {
      return favorites.has(String(id));
    }
  },
  Query: {
    movies: (root, { page = 1 }, { loaders }) => {
      return loaders.axios.load([
        '3/discover/movie',
        {
          params: {
            page
          }
        }
      ])
        .then(res => res.data.results);
    },
    movie: (root, { id }, { loaders }) => {
      return loaders.axios.load([`3/movie/${id}`]).then(res => res.data);
    },
    favorites: (_, __, { loaders }) => {
      return Promise.all(
        Array.from(favorites).map(id => loaders.axios.load([`3/movie/${id}`]).then(res => res.data))
      );
    }
  },
  Mutation: {
    addToFavorites: (root, { input: { id } }, { loaders }) => {
      favorites.add(id);
      return loaders.axios.load([`3/movie/${id}`]).then(res => res.data);
    },
    removeFromFavorites: (root, { input: { id } }, { loaders }) => {
      favorites.delete(id);
      return loaders.axios.load([`3/movie/${id}`]).then(res => res.data);
    }
  }
};