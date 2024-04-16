// app.js

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const playerRoutes = require('./routes/player');

const app = express();

app.use(bodyParser.json());
app.use('/players', playerRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
