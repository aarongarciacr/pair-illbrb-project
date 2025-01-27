"use strict";

const { Spot } = require("../models");

const options = {};
if (process.env.NODE_ENV === "development_with_postgres") {
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
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_29.jpg",
        spotId: 1,
        isPreview: true, // First image for spot 1
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_1.jpg",
        spotId: 1,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_6.jpg",
        spotId: 1,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/ab528dc2-6d44-4f7b-b78a-944af1244e48.jpg",
        spotId: 1,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_28.jpg",
        spotId: 2,
        isPreview: true, // First image for spot 2
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_5.jpg",
        spotId: 2,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_10.jpg",
        spotId: 2,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_11.jpg",
        spotId: 3,
        isPreview: true, // First image for spot 3
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_16.jpg",
        spotId: 3,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_24.jpg",
        spotId: 3,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_3.jpg",
        spotId: 3,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_13.jpg",
        spotId: 4,
        isPreview: true, // First image for spot 4
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_12.jpg",
        spotId: 4,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_30.jpg",
        spotId: 5,
        isPreview: true, // First image for spot 5
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_14.jpg",
        spotId: 5,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_25.jpg",
        spotId: 5,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_15.jpg",
        spotId: 6,
        isPreview: true, // First image for spot 6
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_20.jpg",
        spotId: 6,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_21.jpg",
        spotId: 6,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_22.jpg",
        spotId: 6,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_23.jpg",
        spotId: 7,
        isPreview: true, // First image for spot 7
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_31.jpg",
        spotId: 7,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_17.jpg",
        spotId: 7,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_7.jpg",
        spotId: 7,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_4.jpg",
        spotId: 8,
        isPreview: true, // First image for spot 8
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_18.jpg",
        spotId: 8,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/fotor-ai-202412021257.jpg",
        spotId: 9,
        isPreview: true, // First image for spot 9
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_19.jpg",
        spotId: 9,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_2.jpg",
        spotId: 9,
        isPreview: false,
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_8.jpg",
        spotId: 10,
        isPreview: true, // First image for spot 10
      },
      {
        url: "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_26.jpg",
        spotId: 10,
        isPreview: false,
      },
    ];

    await queryInterface.bulkInsert(options, spotImages, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages"; // Specify the table name explicitly
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      { spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] } },
      {}
    );
  },
};
