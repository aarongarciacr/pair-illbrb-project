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
        //castillo
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_29.jpg",
        spotId: 1,
      },
      {
        //cava de vinos
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_1.jpg",
        spotId: 1,
      },
      {
        //libreria
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_6.jpg",
        spotId: 1,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/ab528dc2-6d44-4f7b-b78a-944af1244e48.jpg",
        spotId: 1,
      },
      {
        //casa alberca a la playa
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_28.jpg",
        spotId: 2,
      },
      {
        //cocina
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_5.jpg",
        spotId: 2,
      },
      {
        //alberca a la playa
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_10.jpg",
        spotId: 2,
      },
      {
        ////casa chida normal
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_11.jpg",
        spotId: 3,
      },
      {
        //sala
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_16.jpg",
        spotId: 3,
      },
      {
        //officina
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_24.jpg",
        spotId: 3,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_3.jpg",
        spotId: 3,
      },
      {
        //industial
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_13.jpg",
        spotId: 4,
      },
      {
        //industial taller
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_12.jpg",
        spotId: 4,
      },
      {
        //acogedor casa
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_30.jpg",
        spotId: 5,
      },
      {
        //acogedor fogata
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_14.jpg",
        spotId: 5,
      },
      {
        //cocina acogedor
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_25.jpg",
        spotId: 5,
      },
      {
        //natural casa
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_15.jpg",
        spotId: 6,
      },
      {
        //interior natural
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_20.jpg",
        spotId: 6,
      },
      {
        //interior natural
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_21.jpg",
        spotId: 6,
      },
      {
        //interior natural
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_22.jpg",
        spotId: 6,
      },
      {
        //playa por fuera
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_23.jpg",
        spotId: 7,
      },
      {
        //habitacion a playa
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_31.jpg",
        spotId: 7,
      },
      {
        //ba;o en el mar
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_17.jpg",
        spotId: 7,
      },
      {
        //vista al mar
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_7.jpg",
        spotId: 7,
      },
      {
        //CASA china
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_4.jpg",
        spotId: 8,
      },
      {
        //interior chinp
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_18.jpg",
        spotId: 8,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/fotor-ai-202412021257.jpg",
        spotId: 9,
      },
      {
        //sala cocina moderna
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_19.jpg",
        spotId: 9,
      },
      {
        //oficina moderna
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_2.jpg",
        spotId: 9,
      },
      {
        //mansion CASA
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_8.jpg",
        spotId: 10,
      },
      {
        //patio mansion
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_26.jpg",
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
