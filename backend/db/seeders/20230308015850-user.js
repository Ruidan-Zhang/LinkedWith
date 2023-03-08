'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Nico',
        lastName: 'Borde',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Liana',
        lastName: 'Nieddu',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Alvis',
        lastName: 'McNiven',
        email: 'user3@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Emil',
        lastName: 'Pastore',
        email: 'user4@user.io',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Lana',
        lastName: 'Green',
        email: 'user5@user.io',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Alina',
        lastName: 'Nicomedes',
        email: 'user6@user.io',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Esben',
        lastName: 'Hoshea',
        email: 'user7@user.io',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Noé',
        lastName: 'Buse',
        email: 'user8@user.io',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName: 'Draco',
        lastName: 'Ricarda',
        email: 'user9@user.io',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        firstName: 'Hallie',
        lastName: 'Anil',
        email: 'user10@user.io',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['user1@user.io', 'user2@user.io', 'user3@user.io', 'user4@user.io', 'user5@user.io', 'user6@user.io', 'user7@user.io', 'user8@user.io', 'user9@user.io', 'user10@user.io'] }
    }, {});
  }
};
