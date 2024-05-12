// controllers/player.js

const Player = require('../models/player');
const Sequelize=require('sequelize')

exports.postPlayer = (req, res, next) => {
  const { name,dateOfBirth, photoUrl, birthPlace, career, matches, score, fifties, centuries, wickets, average } = req.body;
  console.log(req.body);
  // Validate dateOfBirth format
  // const isValidDate = Date.parse(dateOfBirth);
  // if (isNaN(isValidDate)) {
  //   return res.status(400).json({ error: 'Invalid date format for dateOfBirth' });
  // }

  Player.create({
    name,
    dateOfBirth,
    photoUrl,
    birthPlace,
    career,
    matches,
    score,
    fifties,
    centuries,
    wickets,
    average
  })
    .then((player) => {
      console.log('Player created:', player);
      res.status(201).json({ message: 'Player created successfully', player });
    })
    .catch((err) => {
      console.error('Error creating player:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.getAllPlayers = (req, res, next) => {
  Player.findAll()
    .then((players) => {
      console.log('Players retrieved:', players);
      res.status(200).json({ players });
    })
    .catch((err) => {
      console.error('Error fetching players:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.getPlayer = (req, res, next) => {
  const { name } = req.params; // Assuming the parameter is in the URL

  Player.findOne({
    where: {
      [Sequelize.Op.or]: [
        { name: name },
        { id: name } // Assuming name can also be an ID
      ]
    }
  })
    .then(player => {
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
      res.status(200).json({ player });
    })
    .catch(err => {
      console.error('Error fetching player:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
};
