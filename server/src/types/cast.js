exports.type = `
  type Cast {
    id: ID!
    name: String!
    character: String!
    profilePath: String
  }
`;

exports.resolvers = {
  Cast: {
    profilePath: ({ profilePath }) => {
      return `https://image.tmdb.org/t/p/w500${profilePath}`;
    }
  }
};
