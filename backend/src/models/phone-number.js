'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PhoneNumber extends Model {
    static associate(models) {}
  };
  
  PhoneNumber.init({
    number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'phoneNumber'
  });
  
  return PhoneNumber;
};