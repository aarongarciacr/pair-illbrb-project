"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, {
        foreignKey: "spotId",
        otherKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  SpotImage.init(
    {
      url: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Spots",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "SpotImage",
    }
  );
  return SpotImage;
};
