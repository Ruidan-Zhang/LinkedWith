'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Educations';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        schoolName: "South Puget Sound Community College",
        startedAt: '2000-09-01',
        endedAt: '2002-05-20'
      },
      {
        userId: 1,
        schoolName: "New York University",
        startedAt: '2002-09-01',
        endedAt: '2004-05-30'
      },
      {
        userId: 2,
        schoolName: "University of Pennsylvania",
        startedAt: '2008-09-06',
        endedAt: '2012-05-13'
      },
      {
        userId: 3,
        schoolName: "Boston College",
        startedAt: '2003-09-10',
        endedAt: '2007-05-27'
      },
      {
        userId: 6,
        schoolName: "Columbia University",
        startedAt: '2018-09-01',
        endedAt: '2022-05-23'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Educations';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
