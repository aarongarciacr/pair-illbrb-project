"use strict";

const { Booking } = require("../models");
const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

const bookings = [
  {
    userId: 1,
    spotId: 2,
    startDate: new Date("2024-11-15T14:00:00.000Z"),
    endDate: new Date("2024-11-20T11:00:00.000Z"),
  },
  {
    userId: 1,
    spotId: 2,
    startDate: new Date("2024-11-25T14:00:00.000Z"),
    endDate: new Date("2024-11-26T11:00:00.000Z"),
  },
  {
    userId: 2,
    spotId: 1,
    startDate: new Date("2111-01-02T14:00:00.000Z"),
    endDate: new Date("2111-01-03T11:00:00.000Z"),
  },
  {
    userId: 2,
    spotId: 1,
    startDate: new Date("2024-12-01T14:00:00.000Z"),
    endDate: new Date("2024-12-09T11:00:00.000Z"),
  },
  {
    userId: 3,
    spotId: 3,
    startDate: new Date("2024-11-10T14:00:00.000Z"),
    endDate: new Date("2024-11-15T11:00:00.000Z"),
  },
  {
    userId: 1,
    spotId: 3,
    startDate: new Date("2025-01-05T14:00:00.000Z"),
    endDate: new Date("2025-01-10T11:00:00.000Z"),
  },
  {
    userId: 3,
    spotId: 2,
    startDate: new Date("2024-12-10T14:00:00.000Z"),
    endDate: new Date("2024-12-15T11:00:00.000Z"),
  },
  {
    userId: 2,
    spotId: 3,
    startDate: new Date("2024-11-18T14:00:00.000Z"),
    endDate: new Date("2024-11-23T11:00:00.000Z"),
  },
  {
    userId: 1,
    spotId: 1,
    startDate: new Date("2025-02-01T14:00:00.000Z"),
    endDate: new Date("2025-02-05T11:00:00.000Z"),
  },
  {
    userId: 3,
    spotId: 1,
    startDate: new Date("2024-11-30T14:00:00.000Z"),
    endDate: new Date("2024-12-05T11:00:00.000Z"),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(bookings);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await queryInterface.bulkDelete(options, {
      [Sequelize.Op.or]: bookings.map((booking) => ({
        userId: booking.userId,
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
      })),
    });
  },
};
