'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('internetIdentities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        references: {
          model: "users", 
          key: "id" 
        },
        type: Sequelize.INTEGER,
      },
      identityId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      identityType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      screenName: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      data: {
        allowNull: true,
        type: Sequelize.JSONB
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
    await queryInterface.dropTable('internetIdentities');
  }
};
