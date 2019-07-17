const { ObjectID } = require('mongodb');
const { isEmpty, chain } = require('lodash');

/**
 * @desc running activities service
 * @param {Object} db MongoDB database object
 */
function activityService() {
  /**
   * @desc retrieve running activities
   * @param {any} _ gql parent object
   * @param {{first: number, after: string}} queryParams params from gql query
   * @param {{db: any}} context gql context object
   */
  async function getActivities(_, { first = 10, after }, { _db }) {
    try {
      const query = isEmpty(after) ? {} : { _id: { $gt: new ObjectID(after) } };

      const activities = await _db
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
    }
  }

  return {
    getActivities
  };
}

module.exports = activityService;
