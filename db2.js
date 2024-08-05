const { Sequelize, DataTypes } = require('sequelize');
const { User } = require('./db');
const sequelize = new Sequelize('sqlite::memory:');

const Client = sequelize.define('User', {
  number: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = { sequelize,  Client };

// Client.belongsTo(User, {foreignKey: "email"})
