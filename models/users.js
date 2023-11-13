'use strict';

const hash = require('../utils/hash')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Todos, { as: "user_id" , onDelete:"CASCADE", onUpdate:"CASCADE"})
    }
  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('username',hash(value))
      },
      allowNull: false


    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password',hash(value))
      },
      allowNull: false
    },


  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
