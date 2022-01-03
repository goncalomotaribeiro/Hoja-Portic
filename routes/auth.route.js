const express = require('express')
const router = express.Router();
const controller = require('../controllers/auth.controller')
const { validationResult, body } = require('express-validator')

/**
 * @route POST /login
 * @group Authentication - : Operations about authentication
 * @summary User login
 * @param {Login.model} login.body
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
 * @route POST /register
 * @group Authentication
 * @summary User register
 * @param {Register.model} user.body
 * @returns {object} 201 - Created User
 * @returns {Error} 406 - Duplicated User
 * @returns {Error} 400 - Bad request
 */

router.post('/register',
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
    body('name').notEmpty().trim().escape(),
    body('date_birth').notEmpty().trim().escape().isISO8601().toDate(),
    body('weight').notEmpty().trim().escape()
        .isFloat({ min: 10, max: 630 }).withMessage('Must be between 10 and 630 kg')
        .isLength({ min: 2, max: 3 }).withMessage('Must be at least 2 chars long'),
    body('height').notEmpty().trim().escape()
        .isFloat({ min: 50, max: 250 }).withMessage('Must be between 50 and 250 cm')
        .isLength({ min: 2, max: 3 }).withMessage('Must be at least 2 chars long'),
    body('gender').notEmpty().trim().isNumeric().isIn(['0', '1']).withMessage('Use 0 for male or 1 for female'),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            controller.register(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

module.exports = router