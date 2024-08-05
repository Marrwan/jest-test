const { Sequelize, DataTypes } = require('sequelize');
const { Client } = require('./db2');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = { sequelize, User };

User.hasMany(Client, {foreignKey: "client"})
Client.belongsTo(User, {foreignKey: "email"})