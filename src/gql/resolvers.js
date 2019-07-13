const { DateScalarType, ObjectIdScalarType } = require('./scalars');
const { Pagination } = require('./interfaces');
const store = require('../store');
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
