const Sequelize = require('sequelize');

const sequelize = new Sequelize('player', 'root', 'Pramod@21', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
