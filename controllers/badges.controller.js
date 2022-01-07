const db = require('../models/db.js');
const BadgeLevel = db.badge_level;
const BadgeLeaderboard = db.badge_leaderboard;

// Show all badges_level
exports.findAllBadgesLevel = async (req, res) => {
    try {
        let data = await BadgeLevel.findAll({});
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving badges_level.' });
    }
};

// Show all badges_leaderboard
exports.findAllBadgesLeaderboard = async (req, res) => {
    try {
        let data = await BadgeLeaderboard.findAll({});
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving badges_leaderboard.' });
    }
};

// // Add badge to user
// exports.addBadgeToUser = async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.userID);
//         if (user === null)
//             res.status(404).json({ message: `Not found user with id ${req.params.userID}.` });
//         else res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message || `Error retrieving user with id_user ${req.params.userID}.` });
//     }
// };