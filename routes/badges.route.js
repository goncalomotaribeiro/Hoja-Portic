const express = require('express');
const router = express.Router();
const utilities = require('../utilities/utilities');
const BadgesController = require('../controllers/badges.controller');

/**
* @route GET /badges/badges-level
* @group Badges Admin - : Operations for badge admin
* @summary Get all badge_levels
* @returns {object} 200 - An array of badges_level info
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 404 - Not found badges_level
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/badges-level', utilities.validateToken, utilities.isAdmin, BadgesController.findAllBadgesLevel);

/**
* @route GET /badges/badges-leaderboard
* @group Badges Admin - : Operations for badge admin
* @summary Get all badges_leaderboard
* @returns {object} 200 - An array of badges_leaderboard info
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 404 - Not found badges_leaderboard
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/badges-leaderboard', utilities.validateToken, utilities.isAdmin, BadgesController.findAllBadgesLeaderboard);


module.exports = router;