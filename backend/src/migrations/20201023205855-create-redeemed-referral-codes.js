'use strict';

const tableName = "redeemedReferralCodes";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      referralCodeId: {
        references: {
          model: "referralCodes", 
          key: "id" 
        },
        type: Sequelize.INTEGER,
        allowNull: false
      },
      referrerId: {
        references: {
          model: "users", 
          key: "id" 
        },
        type: Sequelize.INTEGER,
        allowNull: true
      },
      referreeId: {
        references: {
          model: "users", 
          key: "id" 
        },
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName);
  }
};
