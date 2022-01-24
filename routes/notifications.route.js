const express = require('express');
const router = express.Router();
const { validationResult, body } = require('express-validator')
const utilities = require('../utilities/utilities');
const notificationsController = require('../controllers/notifications.controller');

/**
 * @route POST /notifications
 * @group Notifications
 * @param {CreateNotification.model} notification.body.required
 * @summary Create new notification
 * @returns {object} 200 - Created notification
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
 router.post('/', utilities.validateToken,
 body('notification_badge').optional().escape().trim(),
 body('description').notEmpty().trim(),
 (req, res) => {
     const errors = validationResult(req);
     if (errors.isEmpty()) {
        notificationsController.create(req, res);
     } else {
         res.status(404).json({ errors: errors.array() });
     }
 }
);

module.exports = router;