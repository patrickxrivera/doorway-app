'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gateInternetIdentities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gateId: {
        references: {
          model: "gates", 
          key: "id" 
        },
        type: Sequelize.INTEGER,
        allowNull: false
      },
      internetIdentityId: {
        references: {
          model: "internetIdentities", 
          key: "id" 
        },
        type: Sequelize.INTEGER,
        allowNull: false
      },
      revokedAt: {
        allowNull: true,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('gateInternetIdentities');
  }
};
