import { ApolloServer } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import 'graphql-import-node';
import * as typeDefs from '../../../common/schema.graphql';
import { TasksDb } from '../db/tasksDb';

// https://stackoverflow.com/a/66827537/3538289
// To parse JS Date objects
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
})

const resolvers = {
  Date: dateScalar,
  Query: {
    hello: () => 'world2',
    getTasks: async () => {
      // new TasksDb().get()
      return await Promise.resolve([]);
    }
  },
};

export const graphQL = new ApolloServer({
  typeDefs,
  resolvers,
});