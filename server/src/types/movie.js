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
  }

  extend type Query {
    movie(id: ID!): Movie
    movies(page: Int): [Movie!]!
  }
`;

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
    genres: ({ genreIds, genres }, _, { axios }) => {
      if (genres) {
        return genres;
      }

      return axios
        .get('3/genre/movie/list')
        .then(res => res.data.genres)
        .then(genres => genreIds.map(id => genres.find(genre => genre.id === id)));
    }
  },
  Query: {
    movies: (root, { page = 1 }, { axios }) => {
      return axios
        .get(
          '3/discover/movie',
          {
            params: {
              page
            }
          }
        )
        .then(res => res.data.results);
    },
    movie: (root, { id }, { axios }) => {
      return axios.get(`3/movie/${id}`).then(res => res.data);
    }
  }
};