const db = require('../models/db.js');
const Notification = db.notification;
const User = db.user;

// Create new notification
exports.create = async (req, res) => {
    try {
        const user = await User.findOne({attributes: ['id_user'], where: { email: req.user.data.email }});
        await Notification.create({
            notification_badge: req.body.notification_badge,
            description: req.body.description,
            id_user: user.id_user,
        });
        return res.status(201).json({ message: 'Notification was created successfully.' });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};
