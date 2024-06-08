"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tickets.init(
    {
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "userID",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      eventID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Events",
          key: "eventID",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ticketID: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      category: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tickets",
      tableName: "Tickets",
    }
  );
  return Tickets;
};
