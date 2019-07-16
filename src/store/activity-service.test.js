// @ts-nocheck
const activityService = require('./activity-service');
const { MongoClient } = require('mongodb');
const { size, first } = require('lodash');

describe('Running Log integration tests', () => {
  var client;
  var db;
  var getActivities;

  beforeAll(async () => {
    client = await MongoClient.connect(global.__DB_URL__, {
      useNewUrlParser: true,
    });

    db = client.db(global.__DB_NAME__);

    getActivities = activityService(db).getActivities;
  });

  describe('Given a request to retrieve activities', () => {
    describe('when providing all query params', () => {
      it('should return a valid response', async () => {
        const params = {
          first: 15,
          after: undefined,
        };

        const { activities, cursor } = await getActivities(null, params);

        expect(size(activities)).toEqual(15);
        expect(first(activities)).toHaveProperty('activityId');
        expect(cursor).not.toBeNull();
      });
    });

    describe('when providing a cursor', () => {
      it('should return all records after specified cursor', async () => {
        const [, secondLast, last] = await db
          .collection('activity')
          .find({})
          .limit(3)
          .toArray();

        const params = {
          first: 10,
          after: String(secondLast._id),
        };

        const { activities } = await getActivities(null, params);

        expect(String(first(activities)._id)).toEqual(String(last._id));
      });
    });
  });

  afterAll(async () => {
    await client.close();
  });
});
