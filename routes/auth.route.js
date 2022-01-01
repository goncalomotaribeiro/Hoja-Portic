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

// /**
//  * @route POST /register
//  * @group Authentication
//  * @summary User register
//  * @param {User.model} user.body
//  * @returns {object} 201 - Created User
//  * @returns {Error} 406 - Duplicated User
//  * @returns {Error} 400 - Bad request
//  */
// router.route('/register').post(
//     body('name').notEmpty().escape().trim(),
//     body('username').notEmpty().escape().trim(),
//     body('password').notEmpty().escape().trim()
//     .isLength({ min: 4 }).withMessage('Must be at least 4 chars long'),
//     (req, res) => {
//         const errors = validationResult(req);
//         if (errors.isEmpty()) {
//             controller.register(req, res);
//         } else {
//             res.status(404).json({ errors: errors.array() });
//         }
//     }
// );

module.exports = router