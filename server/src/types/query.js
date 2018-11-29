module.exports = {
  Query: {
    hello: () => 'world',
    movie: (_, args, ctx) => {
      return ctx.apiClient.get(`movie/${args.id}`).then(res => res.data);
    }
  }
};
