// models/player.js

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
  dateOfBirth: Sequelize.DATE,
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
