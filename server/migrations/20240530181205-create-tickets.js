"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "userID",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      eventID: {
        type: Sequelize.UUID,
        references: {
          model: "Events",
          key: "eventID",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      ticketID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },
      category: {
        type: Sequelize.STRING,
      },
      code: {
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
    await queryInterface.dropTable("Tickets");
  },
};
