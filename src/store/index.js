const { MongoClient } = require('mongodb');

/**
 * MongoDB client connection
 */
async function store(dbUrl, dbName) {
  const client = await MongoClient.connect(dbUrl, {
    useNewUrlParser: true,
  });

  const db = client.db(dbName);

  function closeConnection() {
    client.close();
  }

  return {
    db,
    closeConnection,
  };
}

module.exports = store;
