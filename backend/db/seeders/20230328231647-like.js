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
        firstName: 'Nico',
        lastName: 'Borde'
      },
      {
        userId: 1,
        postId: 2,
        firstName: 'Nico',
        lastName: 'Borde'
      },
      {
        userId: 2,
        postId: 1,
        firstName: 'Liana',
        lastName: 'Nieddu'
      },
      {
        userId: 2,
        postId: 2,
        firstName: 'Liana',
        lastName: 'Nieddu'
      },
      {
        userId: 2,
        postId: 3,
        firstName: 'Liana',
        lastName: 'Nieddu'
      },
      {
        userId: 3,
        postId: 1,
        firstName: 'Alvis',
        lastName: 'McNiven'
      },
      {
        userId: 4,
        postId: 5,
        firstName: 'Emil',
        lastName: 'Pastore'
      },
      {
        userId: 4,
        postId: 6,
        firstName: 'Emil',
        lastName: 'Pastore'
      },
      {
        userId: 5,
        postId: 7,
        firstName: 'Lana',
        lastName: 'Green'
      },
      {
        userId: 6,
        postId: 7,
        firstName: 'Alina',
        lastName: 'Nicomedes'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Likes';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
