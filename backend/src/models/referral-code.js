'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReferralCode extends Model {
    static associate(models) {
        ReferralCode.belongsTo(models.user)
    }
  };
  
  ReferralCode.init({
    code: DataTypes.STRING,
    revokedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'referralCode'
  });
  
  return ReferralCode;
};