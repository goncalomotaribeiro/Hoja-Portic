let jwt = require('jsonwebtoken');

exports.generateToken = (user_info, callback) => {
    let secret = process.env.SECRET; 
    let token = jwt.sign({
        data: user_info,
    }, secret, {expiresIn: '24h'});
    return callback(token); 
}

exports.validateToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            message: 'Token not provided!'
        });
    }
    // verify request token given the JWT secret key
    jwt.verify(token.replace('Bearer ', ''), process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Not authorized!' });
        }
        req.user = decoded;
        next();
    });
};