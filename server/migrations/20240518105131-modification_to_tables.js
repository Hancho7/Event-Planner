"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM("Client", "Planner"),
      allowNull: false,
      defaultValue: "Client",
    });
  },

  async down(queryInterface, Sequelize) {},
};
