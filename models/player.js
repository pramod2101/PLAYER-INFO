const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Player = sequelize.define('player', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  dateOfBirth: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true // Validate that it's a valid date
    }
  },
  // dateOfBirth:Sequelize.DATEONLY,
  photoUrl: Sequelize.STRING,
  birthPlace: Sequelize.STRING,
  career: Sequelize.STRING,
  matches: Sequelize.INTEGER,
  score: Sequelize.INTEGER,
  fifties: Sequelize.INTEGER,
  centuries: Sequelize.INTEGER,
  wickets: Sequelize.INTEGER,
  average: Sequelize.FLOAT
});

module.exports = Player;
