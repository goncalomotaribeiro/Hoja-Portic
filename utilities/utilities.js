const db = require('../models/db.js');
const User = db.user;

let jwt = require('jsonwebtoken');

exports.generateToken = (user_info, callback) => {
    let secret = process.env.SECRET;
    let token = jwt.sign({
        data: user_info,
    }, secret, { expiresIn: '24h' });
    return callback(token);
}

exports.validateToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'Token not provided!' });
    }
    // verify request token given the JWT secret key
    jwt.verify(token.replace('Bearer ', ''), process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Not authorized!' });
        }
        req.user = decoded
        next();
    });
};

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.user.data.email } });
        if (!user.is_admin) {
            return res.status(403).send({ message: 'Not authorized!' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving user.` });
    }
}