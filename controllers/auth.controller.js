const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const db = require('../models/db.js');
const User = db.user;

// Register new user
exports.register = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });

        if (user) {
            return res.status(400).json({ message: 'Email already associated with account!' });
        }

        user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            name: req.body.name,
            date_birth: req.body.date_birth,
            weight: req.body.weight,
            height: req.body.height,
            gender: req.body.gender,
            points: 0,
            mets: 0,
            daily_mets: 0,
            is_admin: false
        });

        return res.status(201).json({ message: 'User was created successfully.' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).json({ message: 'Not Authorized' });
        }

        bcrypt.compare(req.body.password, user.password).then(function (result) {
            if (result) {
                utilities.generateToken({ user: req.body.email }, (token) => {
                    return res.status(200).json('Bearer token: ' + token);
                })
            } else {
                res.status(401).send('Not Authorized');
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};