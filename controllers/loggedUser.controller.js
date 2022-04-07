const db = require('../models/db.js');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { Op } = require("sequelize");
const User = db.user;
const BadgeLevel = db.badge_level;
const Challenge = db.challenge;
const UserChallenge = db.user_challenge;
const ChallengeType = db.challenge_type;
const Notification = db.notification;

// Find logged user Info
exports.findUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: { exclude: ['password', 'is_admin', 'createdAt', 'updatedAt'] },
            where: { email: req.user.data.email }
        });
        if (user === null)
            return res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        else return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving user with email=${req.user.data.email}.` });
    }
};

// Find logged user leaderboard
exports.findUserLeaderBoard = async (req, res) => {
    try {
        const leaderboard = await db.sequelize.query('CALL GetleaderboardWithID ()');
        return res.status(200).json(leaderboard);
    } catch (err) {
        return res.status(500).json({ message: err.message || `Error retrieving leaderboard of user with email=${req.user.data.email}.` });
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
        return res.status(200).json(badges_level);
    } catch (err) {
        return res.status(500).json({ message: err.message || `Error retrieving findUserBadgesLevel of user with email=${req.user.data.email}.` });
    }
};

// Find logged user badges_leaderboard
exports.findUserBadgesLeaderboard = async (req, res) => {
    try {
        const user = await User.findOne({ attributes: ['id_user'], where: { email: req.user.data.email } });

        const badges_leaderboard = await db.sequelize.query('CALL GetleaderboardBadges (:id_user)',
            { replacements: { id_user: user.id_user } })

        return res.status(200).json(badges_leaderboard);
    } catch (err) {
        return res.status(500).json({ message: err.message || `Error retrieving badges_leaderboard of user with email=${req.user.data.email}.` });
    }
};


// Find logged user best 4 badges_leaderboard
exports.findUserBestBadgesLeaderboard = async (req, res) => {
    try {
        const user = await User.findOne({ attributes: ['id_user'], where: { email: req.user.data.email } });

        const best_badges_leaderboard = await db.sequelize.query('CALL GetleaderboardBestBadges (:id_user)',
            { replacements: { id_user: user.id_user } })

        return res.status(200).json(best_badges_leaderboard);
    } catch (err) {
        return res.status(500).json({ message: err.message || `Error retrieving best_badges_leaderboard of user with email=${req.user.data.email}.` });
    }
};

// Find logged user not completed challenges
exports.findUserChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.findAll({
            attributes: ['description', 'to_end', 'points'],
            include: [{
                model: UserChallenge,
                attributes: ['progress', 'completed'],
                where: { completed: false },
                include: { model: User, attributes: [], where: { email: req.user.data.email } }
            },
            {
                model: ChallengeType
            }
            ]
        });
        console.log(challenges);
        return res.status(200).json(challenges);
    } catch (err) {
        return res.status(500).json({ message: err.message || `Error retrieving challenges of user with email=${req.user.data.email}.` });
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
            },
            {
                model: ChallengeType
            }]
        });
        return res.status(200).json(challenges);
    } catch (err) {
        return res.status(500).json({ message: err.message || `Error retrieving completed challenges of user with email=${req.user.data.email}.` });
    }
};

// Find logged user notifications
exports.findUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            attributes: ['notification_badge', 'description', 'created_at'],
            include: {
                model: User,
                attributes: [],
                where: { email: req.user.data.email },

            }
        });
        return res.status(200).json(notifications);
    } catch (err) {
        return res.status(500).json({ message: err.message || `Error retrieving findUserNotifications of user with email=${req.user.data.email}.` });
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
        return res.status(200).json({ message: `User id_user = ${user.id_user} was updated successfully.` });
    } catch (err) {
        return res.status(500).json({ message: `Error updating password user with email=${req.user.data.email}` });
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
                return res.status(200).json({ message: `User id_user = ${user.id_user} password was updated successfully.` });
            } else {
                res.status(401).send('Not Authorized');
            }
        });
    } catch (err) {
        return res.status(500).json({ message: `Error updating password user with email=${req.user.data.email}` });
    }
};

// Update logged user mets
exports.updateMets = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        const new_mets = parseFloat(user.mets) + parseFloat(req.body.mets);
        if (user === null) {
            res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        }
        User.update({ mets: new_mets }, { where: { id_user: user.id_user } });
        return res.status(200).json({ message: `User id_user = ${user.id_user} mets was updated successfully.` });
    } catch (err) {
        return res.status(500).json({ message: `Error updating mets user with email=${req.user.data.email}` });
    }
};

// Update logged user challenges progress
exports.updateChallengesProgress = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        if (user === null) {
            return res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        }

        const old_bicycle_time = await UserChallenge.findOne({ where: { [Op.and]: [{ id_challenge: 1 }, { id_user: user.id_user }] } });
        const old_running_time = await UserChallenge.findOne({ where: { [Op.and]: [{ id_challenge: 2 }, { id_user: user.id_user }] } });
        const old_still_time = await UserChallenge.findOne({ where: { [Op.and]: [{ id_challenge: 3 }, { id_user: user.id_user }] } });
        const old_walking_time = await UserChallenge.findOne({ where: { [Op.and]: [{ id_challenge: 4 }, { id_user: user.id_user }] } });

        const durationsBicycle = [
            old_bicycle_time.progress,
            req.body.bicycle_time
        ]
        const totalDurationsBicycle = durationsBicycle.slice(1)
            .reduce((prev, cur) => moment.duration(cur).add(prev),
                moment.duration(durationsBicycle[0]))

        const new_bicycle_time = (moment.utc(totalDurationsBicycle.asMilliseconds()).format("HH:mm:ss"))

        const durationsRunning = [
            old_running_time.progress,
            req.body.running_time
        ]
        const totalDurationsRunning = durationsRunning.slice(1)
            .reduce((prev, cur) => moment.duration(cur).add(prev),
                moment.duration(durationsRunning[0]))

        const new_running_time = (moment.utc(totalDurationsRunning.asMilliseconds()).format("HH:mm:ss"))

        const durationsStill = [
            old_still_time.progress,
            req.body.still_time
        ]
        const totalDurationsStill = durationsStill.slice(1)
            .reduce((prev, cur) => moment.duration(cur).add(prev),
                moment.duration(durationsStill[0]))

        const new_still_time = (moment.utc(totalDurationsStill.asMilliseconds()).format("HH:mm:ss"))

        const durationsWalking = [
            old_walking_time.progress,
            req.body.walking_time
        ]
        const totalDurationsWalking = durationsWalking.slice(1)
            .reduce((prev, cur) => moment.duration(cur).add(prev),
                moment.duration(durationsWalking[0]))

        const new_walking_time = (moment.utc(totalDurationsWalking.asMilliseconds()).format("HH:mm:ss"))

        await UserChallenge.update({ progress: new_bicycle_time }, { where: { [Op.and]: [{ id_challenge: 1 }, { id_user: user.id_user }] } });
        await UserChallenge.update({ progress: new_running_time }, { where: { [Op.and]: [{ id_challenge: 2 }, { id_user: user.id_user }] } });
        await UserChallenge.update({ progress: new_still_time }, { where: { [Op.and]: [{ id_challenge: 3 }, { id_user: user.id_user }] } });
        await UserChallenge.update({ progress: new_walking_time }, { where: { [Op.and]: [{ id_challenge: 4 }, { id_user: user.id_user }] } });

        return res.status(200).json({ message: `User id_user = ${user.id_user} challenges progress was updated successfully.` });
    } catch (err) {
        return res.status(500).json({ message: `Error updating challenges progress user with email=${req.user.data.email}` });
    }
};

// Update logged picture
exports.updatePicture = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        if (user === null) {
            res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        }
        User.update(req.body, { where: { id_user: user.id_user } });
        return res.status(200).json({ message: `User id_user = ${user.id_user} picture was updated successfully.` });
    } catch (err) {
        return res.status(500).json({ message: `Error picture password user with email=${req.user.data.email}` });
    }
};

// Delete logged user account
exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        if (!user) {
            return res.status(404).json({ message: `Not found user with id_user=${req.user.data.email}.` });
        }
        user.destroy();
        return res.status(200).json({ message: `Deleted user with id_user=${req.user.data.email}.` });
    } catch (err) {
        return res.status(500).json({ message: `Error delete user account with email=${req.user.data.email}` });
    }
};