// app.js

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors=require('cors')
const Player=require('./models/player')
const playerRoutes = require('./routes/player');

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use('/', playerRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  // .then(player => {
  //   if (!player) {
  //     return Player.create({ name: 'virat', dateOfBirth: '00-00-0000', photoUrl:'', birthPlace:'', career:'', matches:''});
  //   }
  //   return player;
  // })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
