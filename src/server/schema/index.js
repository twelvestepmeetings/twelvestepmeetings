/**
 * Import all GraphQL-related schema definitions and resolvers, and export an
 * exceutable schema.
 */

import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
