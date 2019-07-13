const typeDefs = require('./typeDefs');
const { ApolloServer } = require('apollo-server-lambda');
const resolvers = require('./resolvers');

const context = ({ event, context }) => ({
  headers: event.headers,
  functionName: context.functionName,
  event,
  context
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

module.exports = server;
