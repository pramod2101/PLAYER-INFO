// controllers/player.js

const Player = require('../models/player');
const Sequelize=require('sequelize')

exports.postPlayer = (req, res, next) => {
  
  const data=req.body;
  Player.create({
    name:data.name,
    dateOfBirth:data.dateOfBirth,
    photoUrl:data.photoUrl,
    birthPlace:data.birthPlace,
    career:data.career,
    matches:data.matches,
    score:data.score,
    fifties:data.fifties,
    centuries:data.centuries,
    wickets:data.wickets,
    average:data.average
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
    where:  { name: name }
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
