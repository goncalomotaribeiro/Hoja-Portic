const db = require('../models/db.js');
const BadgeLevel = db.badge_level;
const BadgeLeaderboard = db.badge_leaderboard;

// Show all badges_level
exports.findAllBadgesLevel = async (req, res) => {
    try {
        let data = await BadgeLevel.findAll({});
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Some error occurred while retrieving badges_level.' });
    }
};

// Show all badges_leaderboard
exports.findAllBadgesLeaderboard = async (req, res) => {
    try {
        let data = await BadgeLeaderboard.findAll({});
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Some error occurred while retrieving badges_leaderboard.' });
    }
};