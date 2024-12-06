"use strict";

const sequelize = require("sequelize");
const { Model, fn, col } = sequelize;

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, {
        as: "Owner",
        foreignKey: "ownerId",
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        sourceKey: "id",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        sourceKey: "id",
      });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        sourceKey: "id",
      });

      Spot.addScope("withAverageRating", (fieldName = "avgRating") => ({
        include: [
          {
            model: models.Review,
            attributes: [],
          },
        ],
        attributes: {
          include: [
            [fn("ROUND", fn("AVG", col("Reviews.stars")), 1), fieldName],
          ],
        },
        group: ["Spot.id"],
        subQuery: false,
      }));
    }
  }

  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      address: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
        validate: {
          min: -180,
          max: 180,
        },
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [2, 50],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      previewImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );

  return Spot;
};
