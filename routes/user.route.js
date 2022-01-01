const express = require('express');
const router = express.Router();
const { validationResult, body, param, query } = require('express-validator')
const utilities = require('../utilities/utilities');
const usersController = require('../controllers/user.controller');

/**
 * @route GET /users
 * @group Users - : Operations about users
 * @summary Get all users
 * @returns {object} 200 - An array of Users info
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
 router.get('/', utilities.validateToken, usersController.findAll);

/**
 * @route POST /users
 * @group Users
 * @param {User.model} user.body
 * @summary Create new user
 * @returns {object} 200 - Created User
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 406 - Duplicated User
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
router.post('/', utilities.validateToken,
    body('email').notEmpty().escape().isEmail().withMessage('Must be email format').normalizeEmail(),
    body('password').notEmpty().escape().trim()
    .isLength({ min: 4 }).withMessage('Must be at least 4 chars long')
    .matches(/\d/).withMessage('Must contain a number')
    .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password'),
    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match your password');
        }
        return true;
    }),
    body('name').notEmpty().escape().trim(),
    body('age').notEmpty().isNumeric().trim().escape(),
    body('weight').notEmpty().isNumeric().trim().escape().isLength({ max: 3 }).withMessage('Must be 3 chars long'),
    body('height').notEmpty().isNumeric().trim().escape().isLength({ max: 3 }).withMessage('Must be 3 chars long'),
    body('gender').notEmpty().toBoolean().trim().isIn(['0', '1']).withMessage('Use 0 for male or 1 for female'),
    body('is_admin').notEmpty().toBoolean().trim().isIn(['0', '1']).withMessage('Use 0 for admin or 1 for normal user'),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            usersController.create(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

// /**
//  * @route PUT /users/{userID}
//  * @group Users
//  * @summary Update payment_date of User
//  * @param {integer} userID.path.required
//  * @param {Payment_date.model} Payment_date.body
//  * @returns {object} 200 - Updated User payment date
//  * @returns {Error} 401 - Missing or bad authentication
//  * @returns {Error} 403 - Forbidden
//  * @returns {Error} 400 - Bad request
//  * @security Bearer
//  */
//  router.put('/:userID', utilities.validateToken,
//  param('userID').isNumeric(),
//  body('payment_date').optional().escape(),
//  (req, res) => {
//      const errors = validationResult(req);
//      if (errors.isEmpty()) {
//         usersController.update(req, res);
//      } else {
//          res.status(404).json({ errors: errors.array() });
//      }
//  }
// );

module.exports = router;