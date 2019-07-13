const { ObjectID } = require('mongodb');
const { isEmpty, chain } = require('lodash');

/**
 * @desc running activities service
 * @param {Promise} store MongoDB connection
 * @returns {db: any, closeConnection: Function} connection handlers
 */
function activityService(store) {
  /**
   * @desc retrieve running activities
   * @param {{first: number, after: string}} queryParams params from gql query
   */
  async function getActivities(_, { first = 10, after }) {
    const { db, closeConnection } = await store(
      process.env.DB_URL,
      process.env.DB_NAME
    );

    try {
      const query = isEmpty(after) ? {} : { _id: { $gt: ObjectID(after) } };

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
        cursor
      };
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      closeConnection();
    }
  }

  return {
    getActivities
  };
}

module.exports = activityService;
