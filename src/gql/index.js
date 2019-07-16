const typeDefs = require('./typeDefs');
const { ApolloServer } = require('apollo-server-lambda');

module.exports = db => {
  const context = ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  });

  const resolvers = require('./resolvers')(db);

  return new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });
};
