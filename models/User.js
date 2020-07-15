const { DataTypes } = require('sequelize');
const sequelize = require('../config/db').sequelize();

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUIDV4,
    // defaultType: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

// Create table in DB using sync method
User.sync();

module.exports = User;
