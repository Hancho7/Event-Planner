"use strict";
const { Model } = require("sequelize");
const { updateUserRole } = require("../utils/webhook");

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
          if (
            payment.changed("paid") &&
            payment.paid === true &&
            payment.type === "PLANNER_REQUEST"
          ) {
            await updateUserRole(requests, payment.userID);
          }
        },
      },
    }
  );
  return requests;
};
