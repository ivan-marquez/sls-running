const { DateScalarType, ObjectIdScalarType } = require('./scalars');
const { Pagination } = require('./interfaces');

module.exports = db => {
  const { getActivities } = require('../store/activity-service')(db);

  return {
    Query: {
      getActivities,
    },
    ObjectId: ObjectIdScalarType,
    Date: DateScalarType,
    Pagination,
  };
};
