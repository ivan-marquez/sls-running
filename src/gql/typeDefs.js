const { gql } = require('apollo-server-lambda');

/**
 * Running activities GraphQL schema
 */
const typeDefs = gql`
  scalar Date
  scalar ObjectId
  interface Pagination {
    cursor: ObjectId!
  }

  "Activity Summary"
  type ActivitySummary {
    time: String!
    distance: Float!
    avgPace: String!
    bestPace: String!
    avgHR: Int!
    maxHR: Int!
    avgRunCadence: Int
    maxRunCadence: Float
    avgStrideLength: Float
    calories: String!
  }

  "Activity split"
  type ActivitySplit {
    splitNumber: Int!
    time: String!
    cumulativeTime: String!
    movingTime: String!
    distance: String!
    avgPace: String!
    bestPace: String!
    avgHR: Int
    maxHR: Int
    avgRunCadence: Int
    maxRunCadence: Float
    avgStrideLength: Float
    calories: String
  }

  "Activity item"
  type Activity {
    _id: ObjectId!
    activityId: String!
    locationName: String!
    lapCount: Int!
    startTimeLocal: Date!
    distance: Float!
    duration: String!
    averageSpeed: Float!
    maxSpeed: Float!
    calories: Int!
    trainingEffect: Float!
    summary: ActivitySummary!
    splits: [ActivitySplit!]
  }

  type PagedActivities implements Pagination {
    activities: [Activity!]
    cursor: ObjectId!
  }

  type Query {
    "Retrieve running activities"
    getActivities(
      "Amount of records to return"
      first: Int
      "Last record fetched"
      after: ObjectId
    ): PagedActivities!
  }
`;

module.exports = typeDefs;
