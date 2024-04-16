// controllers/player.js

const Player = require('../models/player');

exports.postPlayer = (req, res, next) => {
  const { name, dateOfBirth, photoUrl, birthPlace, career, matches, score, fifties, centuries, wickets, average } = req.body;

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
