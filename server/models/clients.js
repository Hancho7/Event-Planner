"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clients.init(
    {
      client_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      phone_number_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ticket_id: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Clients",
      tableName: "Clients",
    }
  );
  return Clients;
};
