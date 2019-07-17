const { DateScalarType, ObjectIdScalarType } = require('./scalars');

const { getActivities } = require('../service/activity-service')();
const { Pagination } = require('./interfaces');

module.exports = {
  Query: {
    getActivities,
  },
  ObjectId: ObjectIdScalarType,
  Date: DateScalarType,
  Pagination,
};
