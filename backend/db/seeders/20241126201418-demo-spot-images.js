"use strict";

const { Spot } = require("../models");

const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define schema for production
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    if (process.env.SCHEMA) {
      options.schema = process.env.SCHEMA; // Explicit schema for SpotImages
    }

    const spotImages = [
      {
        url: "https://media.gettyimages.com/id/128502214/es/foto/classic-turn-of-the-century-american-house.jpg?s=612x612&w=gi&k=20&c=d-53uwDXwR5s2qtsmTAYOa150b40LXv9X4z9QJNcFUM=",
        spotId: 1,
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1661778773089-8718bcedb39e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJpb3IlMjBkZSUyMGNhc2F8ZW58MHx8MHx8fDA%3D",
        spotId: 1,
      },
      {
        url: "https://media.gettyimages.com/id/128502214/es/foto/classic-turn-of-the-century-american-house.jpg?s=612x612&w=gi&k=20&c=d-53uwDXwR5s2qtsmTAYOa150b40LXv9X4z9QJNcFUM=",
        spotId: 1,
      },
      {
        url: "https://media.gettyimages.com/id/128502214/es/foto/classic-turn-of-the-century-american-house.jpg?s=612x612&w=gi&k=20&c=d-53uwDXwR5s2qtsmTAYOa150b40LXv9X4z9QJNcFUM=",
        spotId: 1,
      },
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGhvbWV8ZW58MHx8fHwxNjgyNzk2MzY3&ixlib=rb-1.2.1&q=80&w=400",
        spotId: 2,
      },
      {
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGhvbWV8ZW58MHx8fHwxNjgyNzk2MzY3&ixlib=rb-1.2.1&q=80&w=400",
        spotId: 3,
      },
      {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGNvbnRlbXBvcmFyeXxlbnwwfHx8fDE2ODI3OTYzNjc&ixlib=rb-1.2.1&q=80&w=400",
        spotId: 4,
      },
      {
        url: "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg",
        spotId: 5,
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzYXN8ZW58MHx8MHx8fDA%3D",
        spotId: 6,
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1661876449499-26de7959878f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNhc2FzfGVufDB8fDB8fHww",
        spotId: 7,
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        spotId: 8,
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzYXxlbnwwfHwwfHx8MA%3D%3D",
        spotId: 9,
      },
      {
        url: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzYXxlbnwwfHwwfHx8MA%3D%3D",
        spotId: 10,
      },
    ];

    await queryInterface.bulkInsert(options, spotImages, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages"; // Specify the table name explicitly
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, { spotId: { [Op.in]: [1] } }, {});
  },
};
