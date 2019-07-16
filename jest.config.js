require('dotenv').load();

module.exports = {
  preset: '@shelf/jest-mongodb',
  globals: {
    __DB_URL__: process.env.DB_URL,
    __DB_NAME__: process.env.DB_NAME,
  },
  testEnvironment: 'node',
};
