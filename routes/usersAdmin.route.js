const express = require('express');
const router = express.Router();
const { validationResult, body, param, query } = require('express-validator')
const utilities = require('../utilities/utilities');
const usersController = require('../controllers/usersAdmin.controller');

/**
 * @route GET /users
 * @group Users Admin - : Operations about users admin
 * @summary Get all users
 * @returns {object} 200 - An array of users info
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
router.get('/', utilities.validateToken, utilities.isAdmin, usersController.findAll);

/**
* @route GET /users/{userID}
* @group Users Admin
* @summary Get user by id_user
* @param {integer} userID.path.required
* @returns {object} 200 - User info
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 404 - Not found user
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get("/:userID", utilities.validateToken, utilities.isAdmin,
    param("userID").isNumeric(),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            usersController.findOne(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    });

/**
 * @route POST /users
 * @group Users Admin
 * @param {file} picture.formData
 * @param {CreateUser.model} user.body.required
 * @summary Create new user
 * @returns {object} 200 - Created User
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 406 - Duplicated User
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
router.post('/', utilities.validateToken, utilities.isAdmin,
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
    body('is_admin').notEmpty().trim().isBoolean(),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            usersController.create(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

/**
 * @route PUT /users/{userID}
 * @group Users Admin
 * @summary Update User
 * @param {integer} userID.path.required
 * @param {UpdateUser.model} user.body.required
 * @returns {object} 200 - Updated User
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
router.put("/:userID", utilities.validateToken, utilities.isAdmin,
    param("userID").isNumeric(),
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
    body('is_admin').notEmpty().trim().isBoolean(),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            usersController.update(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

/**
 * @route DELETE /users/{userID}
 * @group Users Admin
 * @summary Delete User
 * @param {integer} userID.path.required
 * @returns {object} 200 - Deleted user
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 404 - Not found user
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
router.delete("/:userID", utilities.validateToken, utilities.isAdmin,
    param("userID").isNumeric(),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            usersController.delete(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

module.exports = router;