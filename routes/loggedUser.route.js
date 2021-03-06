const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require('express-validator')
const utilities = require('../utilities/utilities');
const usersController = require('../controllers/loggedUser.controller');

/**
* @route GET /logged-user/user-info
* @group Logged User - : Operations for logged basic users
* @summary Get logged user info
* @returns {object} 200 - User info
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/user-info', utilities.validateToken, usersController.findUserInfo);

/**
* @route GET /logged-user/leaderboard
* @group Logged User
* @summary Get logged user leaderboard
* @returns {object} 200 - User leaderboard
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/leaderboard', utilities.validateToken, usersController.findUserLeaderBoard);

/**
* @route GET /logged-user/badges-level
* @group Logged User
* @summary Get logged user badges_level
* @returns {object} 200 - User badges_level
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/badges-level', utilities.validateToken, usersController.findUserBadgesLevel);

/**
* @route GET /logged-user/badges-leaderboard
* @group Logged User
* @summary Get logged user badges_leaderboard
* @returns {object} 200 - User badges_leaderboard
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/badges-leaderboard', utilities.validateToken, usersController.findUserBadgesLeaderboard);

/**
* @route GET /logged-user/badges-leaderboard-best
* @group Logged User
* @summary Get logged user best 4 badges_leaderboard
* @returns {object} 200 - User best 4 badges_leaderboard
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/badges-leaderboard-best', utilities.validateToken, usersController.findUserBestBadgesLeaderboard);

/**
* @route GET /logged-user/challenges
* @group Logged User
* @summary Get logged user not completed challenges
* @returns {object} 200 - User challenges
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/challenges', utilities.validateToken, usersController.findUserChallenges);

/**
* @route GET /logged-user/challenges/completed
* @group Logged User
* @summary Get logged user completed challenges
* @returns {object} 200 - User completed challenges
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/challenges/completed', utilities.validateToken, usersController.findUserChallengesCompleted);

/**
* @route GET /logged-user/notifications
* @group Logged User
* @summary Get logged user notifications
* @returns {object} 200 - User notifications
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/notifications', utilities.validateToken, usersController.findUserNotifications);

/**
 * @route PATCH /logged-user/user-info
 * @group Logged User
 * @param {UpdateLoggedUserInfo.model} user.body.required
 * @summary Update user info
 * @returns {object} 200 - Updated user info
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
router.patch("/user-info", utilities.validateToken,
    body('name').notEmpty().trim().escape(),
    body('date_birth').notEmpty().trim().escape(),
    body('weight').notEmpty().trim().escape()
        .isFloat({ min: 10, max: 630 }).withMessage('Must be between 10 and 630 kg')
        .isLength({ min: 2, max: 3 }).withMessage('Must be at least 2 chars long'),
    body('height').notEmpty().trim().escape()
        .isFloat({ min: 50, max: 250 }).withMessage('Must be between 50 and 250 cm')
        .isLength({ min: 2, max: 3 }).withMessage('Must be at least 2 chars long'),
    body('health_activity_risk').notEmpty().trim().isNumeric().isIn(['1', '2', '3']).withMessage('(1 -> low; 2 -> moderate; 3 -> high'),
    body('gender').notEmpty().trim().isNumeric().isIn(['0', '1']).withMessage('Use 0 for male or 1 for female'),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            usersController.updateUserInfo(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

/**
 * @route PATCH /logged-user/password
 * @group Logged User
 * @param {UpdatePassword.model} user.body.required
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
 * @route PATCH /logged-user/mets
 * @group Logged User
 * @param {UpdateMets.model} user.body.required
 * @summary Update user Mets
 * @returns {object} 200 - Updated Mets
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
 router.patch("/mets", utilities.validateToken,
 body("mets").notEmpty().trim().isNumeric(),
 (req, res) => {
     const errors = validationResult(req);
     if (errors.isEmpty()) {
         usersController.updateMets(req, res);
     } else {
         res.status(404).json({ errors: errors.array() });
     }
 }
);

/**
 * @route PATCH /logged-user/challenges-progress
 * @group Logged User
 * @param {UpdateChallengesProgress.model} user.body.required
 * @summary Update user challenges progress
 * @returns {object} 200 - Updated challenges progress
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
 router.patch("/challenges-progress", utilities.validateToken,
 body("running_time").notEmpty().escape().trim(),
 body("still_time").notEmpty().escape().trim(),
 body("walking_time").notEmpty().escape().trim(),
 body("bicycle_time").notEmpty().escape().trim(),
 (req, res) => {
     const errors = validationResult(req);
     if (errors.isEmpty()) {
         usersController.updateChallengesProgress(req, res);
     } else {
         res.status(404).json({ errors: errors.array() });
     }
 }
);

/**
 * @route PATCH /logged-user/picture
 * @group Logged User
 * @param {UpdatePicture.model} user.body.required
 * @summary Update to new picture
 * @returns {object} 200 - Updated picture
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
router.patch("/picture", utilities.validateToken,
    body("picture").notEmpty().escape().trim(),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            usersController.updatePicture(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
    }
);

/**
 * @route DELETE /logged-user/delete-account
 * @group Logged User
 * @summary Delete account
 * @returns {object} 200 - Deleted account
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 400 - Bad request
 * @security Bearer
*/
router.delete("/delete-account", utilities.validateToken, usersController.deleteAccount);

module.exports = router;