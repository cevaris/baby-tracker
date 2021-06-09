import { ApolloServer } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import 'graphql-import-node';
import * as typeDefs from '../../../common/schema.graphql';
import { firebaseDb } from '../db/firebaseClient';
import { TasksDb } from '../db/tasksDb';

// https://stackoverflow.com/a/66827537/3538289
// To parse JS Date objects
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value: Date | FirebaseFirestore.Timestamp) {
    console.log('serializing date', value);
    if ('toISOString' in value) {
      return value.toDateString();
    }
    if ('toDate' in value) {
      return value.toDate();
    }
    throw Error(`could not serialize date value ${value}`);
  },
})

const taskDB = new TasksDb(firebaseDb);

const resolvers = {
  Date: dateScalar,
  Query: {
    hello: () => 'world2',
    getTasks: async () => {
      return await taskDB.get()
    }
  },
};

export const graphQL = new ApolloServer({
  typeDefs,
  resolvers,
});