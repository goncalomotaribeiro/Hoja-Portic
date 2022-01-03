const db = require('../models/db.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const User = db.user;

let jwt = require('jsonwebtoken');

let userId
// Update user
exports.update = async (req, res) => {
    try {
        
        let token = req.headers.authorization;
        let decoded = jwt.verify(token, process.env.SECRET);

        const user = await User.findOne({ where: { username: decoded.data.username } });
        userId = user.dataValues.id 

        console.log(req.body);

        if (!user) {
            res.status(404).json({ message: `Not found user with id=${userId}.` });
        } else {
            let password = bcrypt.hashSync(req.body.password, 8)
            User.update({password: password}, { where: { id: userId } });
            res.status(200).json({ message: `User id=${userId} password was updated successfully.` });
        }
    } catch (err) {
        res.status(500).json({ message: `Error updating password user id=${userId}`});
    }
};