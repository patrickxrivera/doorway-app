'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gate extends Model {
    static associate(models) {
        Gate.belongsTo(models.user)
    }
  };
  
  Gate.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    revokedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'gate'
  });
  
  return Gate;
};