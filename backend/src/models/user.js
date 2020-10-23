'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  };

  User.init({
  }, {
    sequelize,
    modelName: 'user'
  });
  
  return User;
};