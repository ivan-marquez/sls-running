const { DateScalarType, ObjectIdScalarType } = require('./scalars');
const { Pagination } = require('./interfaces');

const _storeConfig = require('../store');
const store = await _storeConfig(process.env.DB_URL, process.env.DB_NAME);
const { getActivities } = require('../store/activity-service')(store);

const resolvers = {
  Query: {
    getActivities
  },
  ObjectId: ObjectIdScalarType,
  Date: DateScalarType,
  Pagination
};

module.exports = resolvers;
