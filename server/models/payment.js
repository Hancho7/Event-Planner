"use strict";
const { Model } = require("sequelize");
const {
  updateUserRoleAndSecretKey,
  updateEventAttendeesAndUserEvent,
} = require("../utils/hook");

module.exports = (sequelize, DataTypes) => {
  class requests extends Model {
    static associate(models) {
      // define association here
    }
  }
  requests.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["PLANNER_REQUEST", "EVENT_TICKET"],
        allowNull: false,
      },
      eventID: {
        type: DataTypes.UUID,
        references: {
          model: "Events",
          key: "eventID",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      paystack: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Payments",
      tableName: "Payments",
      hooks: {
        afterUpdate: async (payment, options) => {
          if (payment.changed("paid") && payment.paid === true) {
            if (payment.type === "PLANNER_REQUEST") {
              await updateUserRoleAndSecretKey(requests, payment.userID);
            } else if (payment.type === "EVENT_TICKET") {
              await updateEventAttendeesAndUserEvent(
                requests,
                payment.userID,
                payment.eventID
              );
            }
          }
        },
      },
    }
  );
  return requests;
};
