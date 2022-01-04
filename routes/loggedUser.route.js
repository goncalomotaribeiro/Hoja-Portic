const express = require('express');
const router = express.Router();
const { validationResult, body } = require('express-validator')
const utilities = require('../utilities/utilities');
const usersController = require('../controllers/loggedUser.controller');

/**
* @route GET /logged-user/user-info
* @group Logged User - : Operations for logged basic users
* @summary Get logged user info
* @returns {object} 200 - User info
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 404 - Not found user
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/user-info', utilities.validateToken, usersController.findUserInfo);

/**
 * @route PATCH /logged-user/password
 * @group Logged User
 * @param {UpdatePassword.model} user.body
 * @summary Update to new password
 * @returns {object} 200 - Updated Password
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
router.patch("/password", utilities.validateToken,
    body("password").notEmpty().escape().trim(),
    body('new_password').notEmpty().escape().trim()
        .isLength({ min: 4 }).withMessage('Must be at least 4 chars long')
        .matches(/\d/).withMessage('Must contain a number')
        .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password'),
    body('new_password_confirm').custom((value, { req }) => {
        if (value !== req.body.new_password) {
            throw new Error('Password confirmation does not match your password');
        }
        return true;
    }),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            usersController.updatePassword(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

/**
 * @route GET /logged-user/logout
 * @group Logged User
 * @summary User logout
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
 router.get('/logout', utilities.validateToken, usersController.logout);
 
module.exports = router;