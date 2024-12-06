"use strict";

const options = {};
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development_with_postgres"
) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Spots",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        address: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        country: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        lat: {
          type: Sequelize.NUMERIC(9, 6),
          allowNull: true,
        },
        lng: {
          type: Sequelize.NUMERIC(9, 6),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        price: {
          type: Sequelize.NUMERIC(10, 2),
          allowNull: false,
        },
        previewImage: {
          type: Sequelize.TEXT, // Updated from INTEGER to TEXT
          allowNull: true,
          validate: {
            isUrl: true,
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.dropTable(options);
  },
};
