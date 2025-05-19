const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

router.get('/leaderboard', leaderboardController.getLeaderboard);
router.post('/recalculate', leaderboardController.recalculateRanks);

module.exports = router;