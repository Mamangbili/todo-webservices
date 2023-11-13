'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */


const createTodos = (todo, description, user_id) => {
  return {
    todo,
    description,
    user_id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

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
    await queryInterface.bulkInsert('Todos',[
      createTodos('todo1', 'deskripsi 1', 1),
      createTodos('todo2', 'deskripsi 2', 2),
      createTodos('todos 3', 'deskripsi 3', 1),
      createTodos('todos 4', 'deskripsi 4', 1),
      createTodos('todos 5', 'deskripsi 5', 1)
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Todos', null)
  }
};
