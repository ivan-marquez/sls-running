const { GraphQLScalarType, Kind } = require('graphql');
const { ObjectID } = require('mongodb');

/**
 * GraphQL custom scalars
 */

const ObjectIdScalarType = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'MongoDB ObjectId scalar type',
  parseValue(value) {
    return new ObjectID(value);
  },
  serialize(value) {
    return value.toHexString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectID(ast.value);
    }
    return null;
  },
});

const DateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date scalar type',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});

module.exports = {
  ObjectIdScalarType,
  DateScalarType,
};
