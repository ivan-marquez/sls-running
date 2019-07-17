const { MongoClient } = require('mongodb');
const { DateScalarType, ObjectIdScalarType } = require('./scalars');
const { Pagination } = require('./interfaces');

module.exports = (async () => {
  const client = await MongoClient.connect(process.env.DB_URL, {
    useNewUrlParser: true
  });

  const db = client.db(process.env.DB_NAME);

  const { getActivities } = require('../store/activity-service')(db);

  return {
    Query: {
      getActivities
    },
    ObjectId: ObjectIdScalarType,
    Date: DateScalarType,
    Pagination
  };
})();
