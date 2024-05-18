"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.renameColumn("Tokens", "plannerID", "userID");
    await queryInterface.renameColumn("Users", "planner_id", "userID");
    await queryInterface.changeColumn("Tokens", "userID", {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "Users",
        key: "userID",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Users", "userID", "planner_id");
    await queryInterface.renameColumn("Tokens", "userID", "plannerID");
    await queryInterface.changeColumn("Tokens", "plannerID", {
      type: Sequelize.UUID,
      allowNull: true,
      unique: false,
      references: {
        model: "Users",
        key: "planner_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};