const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const db = require('../models/db.js');
const User = db.user;

// exports.register = async (req, res) => {
//     try {
//         let user = await User.findOne({ where: { username: req.body.username } });

//         if (user) {
//             return res.status(400).json({ message: 'Username already exists!' });
//         }

//         user = await User.create({
//             name: req.body.name,
//             username: req.body.username,
//             password: bcrypt.hashSync(req.body.password, 8)
//         });

//         return res.status(201).json({ message: 'User was created successfully.' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

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