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
        hashedPassword: bcrypt.hashSync('password1'),
        image: "https://img.freepik.com/premium-vector/woman-girl-sits-works-laptop-remote-work-communication-internet-satisfied-joyful-vector-flat-illustration_531064-1224.jpg"
      },
      {
        firstName: 'Liana',
        lastName: 'Nieddu',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password2'),
        image: "https://img.freepik.com/premium-vector/internet-assistant-work_132971-57.jpg"
      },
      {
        firstName: 'Alvis',
        lastName: 'McNiven',
        email: 'user3@user.io',
        hashedPassword: bcrypt.hashSync('password3'),
        image: "https://img.freepik.com/premium-vector/man-using-his-phone-instead-working_23-2148501890.jpg?w=360"
      },
      {
        firstName: 'Emil',
        lastName: 'Pastore',
        email: 'user4@user.io',
        hashedPassword: bcrypt.hashSync('password4'),
        image: "https://img.freepik.com/free-vector/service-24-7-concept-illustration_114360-7620.jpg?w=360"
      },
      {
        firstName: 'Lana',
        lastName: 'Green',
        email: 'user5@user.io',
        hashedPassword: bcrypt.hashSync('password5'),
        image: "https://img.freepik.com/premium-vector/office-employee-workplace-happy-woman-manager-character-sitting_1016-4804.jpg?w=2000"
      },
      {
        firstName: 'Alina',
        lastName: 'Nicomedes',
        email: 'user6@user.io',
        hashedPassword: bcrypt.hashSync('password6'),
        image: "https://www.insperity.com/wp-content/uploads/work-from-home_program_1200x630-1024x538.jpg"
      },
      {
        firstName: 'Esben',
        lastName: 'Hoshea',
        email: 'user7@user.io',
        hashedPassword: bcrypt.hashSync('password7'),
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW6hyr-4M88rUuxpcBfpVGhpCzbZHhqmdLvQIIHMFncfjGm6W7Cb2ZrGgKxVdqGvA7djk&usqp=CAU"
      },
      {
        firstName: 'Noé',
        lastName: 'Buse',
        email: 'user8@user.io',
        hashedPassword: bcrypt.hashSync('password8'),
        image: "https://img.freepik.com/free-vector/man-taking-break-from-work_23-2148508516.jpg?w=360"
      },
      {
        firstName: 'Draco',
        lastName: 'Ricarda',
        email: 'user9@user.io',
        hashedPassword: bcrypt.hashSync('password9'),
        image: "https://images.news18.com/ibnlive/uploads/2022/04/shutterstock_1039453264.jpg"
      },
      {
        firstName: 'Hallie',
        lastName: 'Anil',
        email: 'user10@user.io',
        hashedPassword: bcrypt.hashSync('password10'),
        image: "https://img.freepik.com/free-vector/cartoon-online-medical-conference-illustration_23-2148890692.jpg?w=360"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
