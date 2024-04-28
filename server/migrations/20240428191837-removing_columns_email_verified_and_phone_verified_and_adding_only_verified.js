"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn("Clients", "phone_number_verified"),
      queryInterface.removeColumn("Clients", "email_verified"),
      queryInterface.addColumn("Clients", "verified", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Clients", "phone_number_verified", {
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.addColumn("Clients", "email_verified", {
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.removeColumn("Clients", "verified");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
