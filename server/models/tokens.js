"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tokens.init(
    {
      clientID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: "Clients",
          key: "client_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      plannerID: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: "Planners",
          key: "planner_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tokenLink: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      smsCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tokens",
      tableName: "Tokens",
    }
  );
  return Tokens;
};
