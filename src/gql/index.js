const { ApolloServer } = require('apollo-server-lambda');
const { MongoClient } = require('mongodb');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const context = async ({ event, context }) => {
  const client = await MongoClient.connect(process.env.DB_URL, {
    useNewUrlParser: true
  });

  const _db = client.db(process.env.DB_NAME);

  return {
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    _db
  };
};

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context
});
