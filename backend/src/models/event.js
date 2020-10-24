'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
        Event.belongsTo(models.user)
        Event.belongsTo(models.eventType)
    }
  };
  
  Event.init({
  }, {
    sequelize,
    modelName: 'event'
  });
  
  return Event;
};