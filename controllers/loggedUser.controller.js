const db = require('../models/db.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const User = db.user;
let jwt = require('jsonwebtoken');

// Find logged user Info
exports.findUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        if (user === null)
            res.status(404).json({ message: `Not found user with email=${req.user.data.email}.` });
        else res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving user with email=${req.user.data.email}.` });
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

// Logout user
exports.logout = async (req, res) => {
    try {
        req.headers.authorization = '';
        res.status(200).json({ message: `User logout was successfully.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};