"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

const options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "demo@example.com",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "user1@example.com",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Alice",
          lastName: "Johnson",
          email: "user2@example.com",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Bob",
          lastName: "Brown",
          email: "user3@example.com",
          username: "FakeUser3",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Charlie",
          lastName: "Williams",
          email: "user4@example.com",
          username: "FakeUser4",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          firstName: "David",
          lastName: "Jones",
          email: "user5@example.com",
          username: "FakeUser5",
          hashedPassword: bcrypt.hashSync("password6"),
        },
        {
          firstName: "Ella",
          lastName: "Taylor",
          email: "user6@example.com",
          username: "FakeUser6",
          hashedPassword: bcrypt.hashSync("password7"),
        },
        {
          firstName: "Frank",
          lastName: "Moore",
          email: "user7@example.com",
          username: "FakeUser7",
          hashedPassword: bcrypt.hashSync("password8"),
        },
        {
          firstName: "Grace",
          lastName: "Anderson",
          email: "user8@example.com",
          username: "FakeUser8",
          hashedPassword: bcrypt.hashSync("password9"),
        },
        {
          firstName: "Hannah",
          lastName: "Thomas",
          email: "user9@example.com",
          username: "FakeUser9",
          hashedPassword: bcrypt.hashSync("password10"),
        },
      ],
      { validate: true } // Validate data before insertion
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "Demo-lition",
            "FakeUser1",
            "FakeUser2",
            "FakeUser3",
            "FakeUser4",
            "FakeUser5",
            "FakeUser6",
            "FakeUser7",
            "FakeUser8",
            "FakeUser9",
          ],
        },
      },
      {}
    );
  },
};
