const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  programId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  curriculum: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  subjects: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  requirements: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  objectives: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  }
});

module.exports = Course;