'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, [
      {
        userId: 2,
        postId: 1,
        content: "Congratulations!"
      },
      {
        userId: 3,
        postId: 2,
        content: "Resume sent."
      },
      {
        userId: 1,
        postId: 3,
        content: "Sorry to hear. Wishing the best for you!"
      },
      {
        userId: 3,
        postId: 4,
        content: "YAY!!"
      },
      {
        userId: 2,
        postId: 5,
        content: "Interesting."
      },
      {
        userId: 10,
        postId: 7,
        content: "Congrats!"
      },
      {
        userId: 1,
        postId: 7,
        content: "You made it!"
      },
      {
        userId: 2,
        postId: 8,
        content: "Thanks for sharing this."
      },
      {
        userId: 3,
        postId: 1,
        content: "Happy for you!"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
