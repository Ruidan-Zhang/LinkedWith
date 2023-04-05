'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Skills';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        content: "Video production"
      },
      {
        userId: 1,
        content: "Adobe Premiere Pro"
      },
      {
        userId: 2,
        content: "Time management"
      },
      {
        userId: 3,
        content: "Teamwork"
      },
      {
        userId: 4,
        content: "Communication"
      },
      {
        userId: 5,
        content: "Public speaking"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Skills';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
