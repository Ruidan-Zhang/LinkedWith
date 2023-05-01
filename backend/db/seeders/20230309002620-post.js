'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Posts';
    return queryInterface.bulkInsert(options, [
      {
        userId: 7,
        content: "Some days I feel like a failure and I don't know what I'm doing. Today is one such day. Maybe everyone feels that way sometimes. I just want to say that I'm with you."
      },
      {
        userId: 6,
        content: "I'm happy to share that I've completed my study at Columbia University!",
        image: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?cs=srgb&dl=pexels-cottonbro-studio-3171837.jpg&fm=jpg"
      },
      {
        userId: 5,
        content: "The Coca-Cola Company, Keurig Dr Pepper and PepsiCo are offering more choices with less sugar. In fact, nearly 60% of beverages sold contain zero sugar."
      },
      {
        userId: 4,
        content: "Our 18-month online M.A. in Art and Technology offers technology skills that can open new worlds of possibility for your creativity. Learn more today."
      },
      {
        userId: 3,
        content: "Congratulations to team captain Natalie Bruns (player of the year!) and her teammates on this well-earned UAA recognition for an incredible top-10 season!",
        image: "https://www.wcupa.edu/healthSciences/images/_celebrate2020/congratulations.jpg"
      },
      {
        userId: 10,
        content: "We are hiring! If you are interested, please reach out to demo@demo.io.",
        image: "https://www.checkster.com/hubfs/iStock-1138022497.jpg"
      },
      {
        userId: 2,
        content: "Last week I had my last day at Google. It is very bittersweet for me to leave a company, and a role, that I really loved. I am so thankful to the amazing leadership, managers, and coworkers who made the job so great."
      },
      {
        userId: 8,
        content: "I am happy to announce that I will be joining Demo Company as a Software Engineer Intern this Summer!",
        image: "https://media.wired.com/photos/621575377d11d746344b5a72/191:100/w_2287,h_1197,c_limit/Business_Person%20Working%20on%20Laptop_1302475706.jpg"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Posts';
    return queryInterface.bulkDelete(options, {}, {});
  }
};
