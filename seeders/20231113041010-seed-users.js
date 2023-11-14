'use strict';

const hash = require('../utils/hash')
const createUser = (id, username, password) => ({ id, username: hash(username), password: hash(password), createdAt: new Date(), updatedAt: new Date() })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      createUser(2, 'joni', 'joni123'), createUser(1, 'cecep', 'cecep123')
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null)
  }
};
