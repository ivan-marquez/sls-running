const { MongoClient } = require('mongodb');

async function _ () {
  const client = await MongoClient.connect(process.env.DB_URL, {
    useNewUrlParser: true,
  });

  const db = client.db(process.env.DB_NAME);
  const server = require('./gql')(db);
}

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
