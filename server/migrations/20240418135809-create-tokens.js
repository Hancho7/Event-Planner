"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clientID: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "Clients",
          key: "client_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      plannerID: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "Planners",
          key: "planner_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tokenLink: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      smsCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tokens");
  },
};
