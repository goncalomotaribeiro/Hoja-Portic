const db = require('../models/db.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const User = db.user;
const BadgeLevel = db.badge_level;
const BadgeLeaderboard = db.badge_leaderboard;
const Challenge = db.challenge;
const UserChallenge = db.user_challenge;

// Find logged user Info
exports.findUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ['email', 'name', 'date_birth', 'weight', 'height', 'gender', 'picture', 'points', 'mets', 'daily_mets'],
            where: { email: req.user.data.email },
        });
        if (user === null)
            res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        else res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving user with email=${req.user.data.email}.` });
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
        const badges_leaderboard = await BadgeLeaderboard.findAll({
            attributes: ['description', 'points', 'number', 'badge_name'],
            include: {
                model: User,
                attributes: [],
                where: { email: req.user.data.email }
            }
        });
        res.status(200).json(badges_leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving badges_leaderboard of user with email=${req.user.data.email}.` });
    }
};

// Find logged user not completed challenges
exports.findUserChallenges = async (req, res) => {
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
                where: { completed: false }
            }]
        });
        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving challenges of user with email=${req.user.data.email}.` });
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