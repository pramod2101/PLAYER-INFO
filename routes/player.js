// routes/player.js

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player');

router.post('/', playerController.postPlayer); // Assuming playerController.addPlayer handles adding a new player
router.get('/', playerController.getAllPlayers);
router.get('/:name',playerController.getPlayer)

module.exports = router;
