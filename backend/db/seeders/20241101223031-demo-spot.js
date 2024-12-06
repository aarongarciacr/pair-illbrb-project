"use strict";

const { Spot } = require("../models");

const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in the options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "456 Sunset Boulevard",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.052235,
        lng: -118.243683,
        name: "Modern Glass Villa",
        description:
          "A luxurious modern glass villa with breathtaking views of the city.",
        price: 450,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_29.jpg",
      },
      {
        ownerId: 2,
        address: "789 Ocean Drive",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 25.761681,
        lng: -80.191788,
        name: "Tropical Beach House",
        description: "A serene tropical beach house steps away from the ocean.",
        price: 350,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_28.jpg",
      },
      {
        ownerId: 3,
        address: "321 Elm Street",
        city: "Austin",
        state: "Texas",
        country: "United States of America",
        lat: 30.267153,
        lng: -97.743057,
        name: "Rustic Log Cabin",
        description:
          "Cozy log cabin surrounded by nature in the heart of Texas.",
        price: 200,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_11.jpg",
      },
      {
        ownerId: 4,
        address: "101 Royal Avenue",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 47.606209,
        lng: -122.332069,
        name: "Victorian Mansion",
        description:
          "Elegant Victorian mansion with historical charm and modern comforts.",
        price: 600,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_13.jpg",
      },
      {
        ownerId: 5,
        address: "555 Lakeshore Drive",
        city: "Chicago",
        state: "Illinois",
        country: "United States of America",
        lat: 41.878113,
        lng: -87.629799,
        name: "Urban Skyline Penthouse",
        description:
          "Luxury penthouse with stunning views of Chicago's skyline.",
        price: 700,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_30.jpg",
      },
      {
        ownerId: 6,
        address: "202 Mountain View Road",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 39.739236,
        lng: -104.990251,
        name: "Eco-Friendly Earth House",
        description:
          "A sustainable and energy-efficient home nestled in the mountains.",
        price: 250,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_15.jpg",
      },
      {
        ownerId: 7,
        address: "88 Harbor Way",
        city: "Boston",
        state: "Massachusetts",
        country: "United States of America",
        lat: 42.360081,
        lng: -71.058884,
        name: "Seaside Retreat",
        description:
          "Beautiful retreat with sweeping ocean views and modern amenities.",
        price: 400,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_23.jpg",
      },
      {
        ownerId: 8,
        address: "12 Sakura Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.774929,
        lng: -122.419418,
        name: "Japanese Ryokan",
        description:
          "Traditional Japanese-style ryokan with a tranquil atmosphere.",
        price: 300,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_4.jpg",
      },
      {
        ownerId: 9,
        address: "77 Sapphire Drive",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.712776,
        lng: -74.005974,
        name: "Luxury Brownstone",
        description:
          "Elegant brownstone home in the heart of Manhattan's Upper East Side.",
        price: 800,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/fotor-ai-202412021257.jpg",
      },
      {
        ownerId: 10,
        address: "303 Desert Rose Street",
        city: "Phoenix",
        state: "Arizona",
        country: "United States of America",
        lat: 33.448376,
        lng: -112.074036,
        name: "Desert Oasis",
        description:
          "A stunning desert home with modern architecture and pool views.",
        price: 500,
        previewImage:
          "https://ill-brb.s3.us-east-2.amazonaws.com/2024-12-2/fotor-ai-2024120205646_8.jpg",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            "Modern Glass Villa",
            "Tropical Beach House",
            "Rustic Log Cabin",
            "Victorian Mansion",
            "Urban Skyline Penthouse",
            "Eco-Friendly Earth House",
            "Seaside Retreat",
            "Japanese Ryokan",
            "Luxury Brownstone",
            "Desert Oasis",
          ],
        },
      },
      {}
    );
  },
};
