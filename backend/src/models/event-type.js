'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventType extends Model {
    static associate(models) {
        
    }
  };
  
  EventType.init({
    type: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'eventType'
  });
  
  return EventType;
};