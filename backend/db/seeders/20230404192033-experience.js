'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Experiences';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        companyName: "Rolla",
        jobTitle: 'Video Editor',
        startedAt: '2004-08-25',
        endedAt: '2006-03-14'
      },
      {
        userId: 1,
        companyName: "JellySmack",
        jobTitle: 'Video Editor',
        startedAt: '2006-06-20',
        endedAt: '2008-10-31'
      },
      {
        userId: 2,
        companyName: "OneWorld",
        jobTitle: 'Environmental Scientists and Specialists',
        startedAt: '2013-08-10',
        endedAt: '2020-06-04'
      },
      {
        userId: 3,
        companyName: "Evergreen",
        jobTitle: 'Physician assistants',
        startedAt: '2006-07-21',
        endedAt: '2007-03-21'
      },
      {
        userId: 7,
        companyName: "Netflix",
        jobTitle: '3D Designer',
        startedAt: '2014-09-21',
        endedAt: '2020-08-31'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Experiences';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
