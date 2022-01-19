const db = require('../models/db.js');
const bcrypt = require('bcrypt');
const User = db.user;
const BadgeLevel = db.badge_level;
const Challenge = db.challenge;
const UserChallenge = db.user_challenge;

// Find logged user Info
exports.findUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: { exclude: ['password', 'is_admin', 'createdAt', 'updatedAt'] },
            where: { email: req.user.data.email },
        });
        if (user === null)
            res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        else res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving user with email=${req.user.data.email}.` });
    }
};

// Find logged user leaderboard
exports.findUserLeaderBoard = async (req, res) => {
    try {
        const leaderboard = await db.sequelize.query('CALL Getleaderboard ()');
        res.status(200).json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving leaderboard of user with email=${req.user.data.email}.` });
    }
};

// Find logged user badges_level
exports.findUserBadgesLevel = async (req, res) => {
    try {

        const badges_level = await BadgeLevel.findAll({
            attributes: ['description', 'to_get', 'number', 'badge_name'],
            include: {
                model: User,
                attributes: [],
                where: { email: req.user.data.email }
            }
        });
        res.status(200).json(badges_level);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving findUserBadgesLevel of user with email=${req.user.data.email}.` });
    }
};

// Find logged user badges_leaderboard
exports.findUserBadgesLeaderboard = async (req, res) => {
    try {
        const user = await User.findOne({attributes: ['id_user'], where: { email: req.user.data.email }});

        const badges_leaderboard = await db.sequelize.query('CALL GetleaderboardBadges (:id_user)', 
        {replacements: { id_user: user.id_user }})

        res.status(200).json(badges_leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving badges_leaderboard of user with email=${req.user.data.email}.` });
    }
};


// Find logged user best 4 badges_leaderboard
exports.findUserBestBadgesLeaderboard = async (req, res) => {
    try {
        const user = await User.findOne({attributes: ['id_user'], where: { email: req.user.data.email }});

        const best_badges_leaderboard = await db.sequelize.query('CALL GetleaderboardBestBadges (:id_user)', 
        {replacements: { id_user: user.id_user }})

        res.status(200).json(best_badges_leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving best_badges_leaderboard of user with email=${req.user.data.email}.` });
    }
};

// Find logged user not completed challenges
exports.findUserChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.findAll({
            attributes: ['description', 'to_end', 'points'],
            include: [
                {
                    model: UserChallenge,
                    attributes: ['progress', 'completed'],
                    where: { completed: false },
                    include: { model: User, attributes: [], where: { email: req.user.data.email } }
                }]
        });
        console.log(challenges);
        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving challenges of user with email=${req.user.data.email}.` });
    }
};


// Find logged user completed challenges
exports.findUserChallengesCompleted = async (req, res) => {
    try {
        const challenges = await Challenge.findAll({
            attributes: ['description', 'to_end', 'points'],
            include: [{
                model: User,
                attributes: [],
                where: { email: req.user.data.email },
            },
            {
                model: UserChallenge,
                attributes: ['progress', 'completed'],
                where: { completed: true }, include: { model: User, attributes: [], where: { email: req.user.data.email } }
            }]
        });
        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving completed challenges of user with email=${req.user.data.email}.` });
    }
};


// Update logged user info
exports.updateUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        if (user === null) {
            res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        }
        User.update(req.body, { where: { id_user: user.id_user } });
        res.status(200).json({ message: `User id_user = ${user.id_user} was updated successfully.` });
    } catch (err) {
        res.status(500).json({ message: `Error updating password user with email=${req.user.data.email}` });
    }
};

// Update logged user password
exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        if (user === null) {
            res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        }
        bcrypt.compare(req.body.password, user.password).then(function (result) {
            if (result) {
                User.update({ password: bcrypt.hashSync(req.body.new_password, 8) }, { where: { id_user: user.id_user } });
                res.status(200).json({ message: `User id_user = ${user.id_user} password was updated successfully.` });
            } else {
                res.status(401).send('Not Authorized');
            }
        });
    } catch (err) {
        res.status(500).json({ message: `Error updating password user with email=${req.user.data.email}` });
    }
};

// Update logged user info
exports.updatePicture = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        if (user === null) {
            res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        }
        User.update(req.body, { where: { id_user: user.id_user } });
        res.status(200).json({ message: `User id_user = ${user.id_user} picture was updated successfully.` });
    } catch (err) {
        res.status(500).json({ message: `Error updating password user with email=${req.user.data.email}` });
    }
};

// Delete logged user account
exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        if (user === null) {
            res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        }
        bcrypt.compare(req.body.password, user.password).then(function (result) {
            if (result) {
                User.destroy({ where: { id_user: user.id_user } });
                return res.status(200).json({ message: `Deleted user with email=${req.user.data.email}.` });
            } else {
                res.status(401).send('Not Authorized');
            }
        });
    } catch (err) {
        res.status(500).json({ message: `Error updating password user with email=${req.user.data.email}` });
    }
};