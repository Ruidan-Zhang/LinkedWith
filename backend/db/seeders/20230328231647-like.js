'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Likes';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        postId: 1,
        liked: false
      },
      {
        userId: 1,
        postId: 2,
        liked: true
      },
      {
        userId: 2,
        postId: 1,
        liked: true
      },
      {
        userId: 2,
        postId: 2,
        liked: true
      },
      {
        userId: 2,
        postId: 3,
        liked: false
      },
      {
        userId: 3,
        postId: 1,
        liked: true
      },
      {
        userId: 4,
        postId: 5,
        liked: false
      },
      {
        userId: 4,
        postId: 6,
        liked: true
      },
      {
        userId: 5,
        postId: 7,
        liked: true
      },
      {
        userId: 6,
        postId: 7,
        liked: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Likes';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
