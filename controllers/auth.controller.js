const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const db = require('../models/db.js');
const User = db.user;
const UserBadge = db.user_badge;
const UserChallenge = db.user_challenge;
const Challenge = db.challenge;

// Register new user
exports.signup = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });

        if (user) {
            return res.status(400).json({ message: 'Email already associated with account!' });
        }

        user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            name: '',
            date_birth: '',
            weight: 0,
            height: 0,
            gender: 0,
            points: 0,
            mets: 0,
            daily_mets: 0,
            level: "Novato",
            is_admin: false
        });

        await UserBadge.create({ id_user: user.id_user, id_badge_level: 1 });

        const challenges = await Challenge.findAll({attributes: ['id_challenge']})
        for (let i = 0; i < challenges.length; i++) {
            const challenge = challenges[i];
            await UserChallenge.create({ id_user: user.id_user, id_challenge: challenge.id_challenge , progress: '00:00:00', completed: 0});
        }

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
            res.status(401).send('Not Authorized');
        }

        bcrypt.compare(req.body.password, user.password).then(function (result) {
            if (result) {
                utilities.generateToken({ email: req.body.email }, (token) => {
                    return res.status(200).send(token);
                })
            } else {
                res.status(401).send('Not Authorized');
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};