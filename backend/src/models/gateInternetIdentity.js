'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GateInternetIdentity extends Model {
    static associate(models) {
        GateInternetIdentity.belongsTo(models.gate)
        GateInternetIdentity.belongsTo(models.internetIdentity)
    }
  };
  
  GateInternetIdentity.init({
    revokedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'gateInternetIdentity'
  });
  
  return GateInternetIdentity;
};