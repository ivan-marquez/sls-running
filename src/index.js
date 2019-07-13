const server = require('./gql');

exports.graphqlHandler = server.createHandler();
