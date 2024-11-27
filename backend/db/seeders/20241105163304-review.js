"use strict";

const { Review } = require("../models");

const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          userId: 1,
          spotId: 1,
          review: "This was an awesome spot!",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 2,
          review: "This was a horrible spot!",
          stars: 1,
        },
        {
          userId: 3,
          spotId: 3,
          review: "Martians are so nice.",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 1,
          review: "Meh! Could be better.",
          stars: 2,
        },
        {
          userId: 1,
          spotId: 2,
          review: "Great experience. Loved the hospitality.",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review: "It was okay. The view made up for it.",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 2,
          review: "The worst experience of my life.",
          stars: 1,
        },
        {
          userId: 1,
          spotId: 3,
          review: "Fantastic spot. Will visit again!",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 3,
          review: "Unique and fun place to stay.",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 2,
          review: "Not worth the money at all.",
          stars: 2,
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
