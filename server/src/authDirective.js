const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver, GraphQLError } = require('graphql');

module.exports = class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // Get the resolver if one has been provided or fallback to the default
    // implementation, ie resolve matching property name.

    const { resolve = defaultFieldResolver } = field;

    // Overload the field resolver with a higher order resolver which
    // will throw or resolve depending on whether the user is authorized..
    field.resolve = function(...args) {
      const [, , ctx] = args;
      if (!ctx.isLoggedIn) {
        throw new GraphQLError('Unauthorized. This action requires a logged in user');
      }

      return resolve.apply(this, args);
    };
  }
};
