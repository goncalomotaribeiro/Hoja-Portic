const express = require('express')
const router = express.Router();
const controller = require('../controllers/auth.controller')
const { validationResult, body } = require('express-validator')

/**
 * @route POST /login
 * @group Authentication - : Operations about authentication
 * @summary User login
 * @param {Login.model} user.body
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 400 - Bad request
 */
router.route('/login').post(
    body('email').notEmpty().escape(),
    body('password').notEmpty().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.login(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

/**
 * @route POST /signup
 * @group Authentication
 * @summary User sign up
 * @param {Signup.model} user.body
 * @returns {object} 201 - Created User
 * @returns {Error} 406 - Duplicated User
 * @returns {Error} 400 - Bad request
 */

router.post('/signup',
    body('email').notEmpty().escape().isEmail().withMessage('Must be email format').normalizeEmail(),
    body('password').notEmpty().escape().trim()
        .isLength({ min: 4 }).withMessage('Must be at least 4 chars long')
        .matches(/\d/).withMessage('Must contain a number')
        .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password'),
    body('password_confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match your password');
        }
        return true;
    }),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.signup(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

module.exports = router