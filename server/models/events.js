"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Events.init(
    {
      plannerID: {
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
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      startOfDate: {
        type: DataTypes.DATE, //ISO 8601 String
        allowNull: false,
      },
      endOfDate: {
        type: DataTypes.DATE, //ISO 8601 String
        allowNull: false,
      },
      bookingDeadline: {
        type: DataTypes.DATE, //ISO 8601 String
        allowNull: false,
      },
      attendees: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      attendeeList: {
        type: DataTypes.ARRAY(DataTypes.UUID),
      },
      numberOfAttendees: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "Events",
      tableName: "Events",
    }
  );
  return Events;
};
