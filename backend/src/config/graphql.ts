import { ApolloServer } from 'apollo-server-express';
import 'graphql-import-node';
import * as typeDefs from '../../../common/schema.graphql';

const resolvers = {
  Query: {
    hello: () => 'world2',
  },
};

export const graphQL = new ApolloServer({
  typeDefs,
  resolvers,
});