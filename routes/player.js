// routes/player.js

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player');

router.post('/', playerController.postPlayer);
router.get('/', playerController.getAllPlayers);

module.exports = router;
