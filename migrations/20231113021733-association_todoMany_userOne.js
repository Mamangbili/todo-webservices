'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.addConstraint('Todos', 
      {
        name : "user_id_fk",
        fields:[ 'user_id' ],
        type:'foreign key',
        references: {
            table: 'Users',
            field: 'id'
        },
        allowNull: false,
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    
    await queryInterface.removeConstraint('user_id_fk')
  }
};
