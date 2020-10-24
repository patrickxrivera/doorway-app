'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RedeemedReferralCode extends Model {
    static associate(models) {
        RedeemedReferralCode.belongsTo(models.referralCode);
        RedeemedReferralCode.belongsTo(models.user, {
            as: "referrer",
            foreignKey: "referrerId"
        });
        RedeemedReferralCode.belongsTo(models.user, {
            as: "referree",
            foreignKey: "referreeId"
        });
    }
  };
  
  RedeemedReferralCode.init({
  }, {
    sequelize,
    modelName: 'redeemedReferralCode'
  });
  
  return RedeemedReferralCode;
};