const { ObjectID } = require('mongodb');
const { isEmpty, chain } = require('lodash');

/**
 * @desc running activities service
 * @param {Object} db MongoDB database object
 */
function activityService(db) {
  /**
   * @desc retrieve running activities
   * @param {any} _ gql parent object
   * @param {{first: number, after: string}} queryParams params from gql query
   */
  async function getActivities(_, { first = 10, after }) {
    try {
      const query = isEmpty(after) ? {} : { _id: { $gt: new ObjectID(after) } };

      const activities = await db
        .collection('activity')
        .find(query)
        .limit(first)
        .toArray();

      const { _id: cursor = '' } = chain(activities)
        .last()
        .pick('_id')
        .value();

      return {
        activities,
        cursor,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return {
    getActivities,
  };
}

module.exports = activityService;
