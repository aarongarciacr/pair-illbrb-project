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
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        previewImage: 1,
      },
      {
        ownerId: 2,
        address: "156 Invented Road",
        city: "San Pancho",
        state: "Arizona",
        country: "United States of America",
        lat: 34.7456358,
        lng: -222.4784327,
        name: "Spot 2",
        description: "Place where web developers are exploded",
        price: 555,
        previewImage: 2,
      },
      {
        ownerId: 1,
        address: "45224 Mickey Lane",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 31.7678558,
        lng: -132.4518927,
        name: "Mars",
        description: "BIP BIP BOP BOP",
        price: 515.65,
        previewImage: 3,
      },
      {
        ownerId: 3,
        address: "789 Main Street",
        city: "Phoenix",
        state: "Arizona",
        country: "United States of America",
        lat: 35.7642358,
        lng: -122.1234567,
        name: "Desert Oasis",
        description: "A tranquil escape in the desert.",
        price: 200,
        previewImage: 4,
      },
      {
        ownerId: 2,
        address: "321 Ocean Avenue",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 25.7617,
        lng: -80.1918,
        name: "Beachfront Paradise",
        description: "Enjoy the beach at your doorstep.",
        price: 600,
        previewImage: 5,
      },
      {
        ownerId: 1,
        address: "55 Broadway",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.7128,
        lng: -74.006,
        name: "Big Apple Loft",
        description: "Live the NYC experience in style.",
        price: 800,
        previewImage: 6,
      },
      {
        ownerId: 3,
        address: "100 Maple Drive",
        city: "Portland",
        state: "Oregon",
        country: "United States of America",
        lat: 45.5122,
        lng: -122.6587,
        name: "Nature's Retreat",
        description: "Surrounded by trees and tranquility.",
        price: 150,
        previewImage: 7,
      },
      {
        ownerId: 2,
        address: "444 Silicon Valley Blvd",
        city: "Palo Alto",
        state: "California",
        country: "United States of America",
        lat: 37.4419,
        lng: -122.143,
        name: "Tech Hub Haven",
        description: "Modern home in the heart of innovation.",
        price: 700,
        previewImage: 8,
      },
      {
        ownerId: 1,
        address: "89 Forest Trail",
        city: "Aspen",
        state: "Colorado",
        country: "United States of America",
        lat: 39.1911,
        lng: -106.8175,
        name: "Mountain Chalet",
        description: "Cozy up in this snowy mountain retreat.",
        price: 450,
        previewImage: 9,
      },
      {
        ownerId: 3,
        address: "12 Pearl Street",
        city: "Boston",
        state: "Massachusetts",
        country: "United States of America",
        lat: 42.3601,
        lng: -71.0589,
        name: "Historic Charm",
        description: "Experience history with modern comforts.",
        price: 300,
        previewImage: 10,
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
            "App Academy",
            "Spot 2",
            "Mars",
            "Desert Oasis",
            "Beachfront Paradise",
            "Big Apple Loft",
            "Nature's Retreat",
            "Tech Hub Haven",
            "Mountain Chalet",
            "Historic Charm",
          ],
        },
      },
      {}
    );
  },
};
