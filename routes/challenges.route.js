const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require('express-validator')
const utilities = require('../utilities/utilities');
const challengesController = require('../controllers/challenges.controller');

/**
* @route GET /challenges
* @group Challenges Admin - : Operations for challenges admin
* @summary Get all challenges
* @returns {object} 200 - An array of challenges info
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/', utilities.validateToken, utilities.isAdmin, challengesController.findAll);

/**
 * @route POST /challenges
 * @group Challenges Admin
 * @param {CreateChallenge.model} challenge.body.required
 * @summary Create new challenge
 * @returns {object} 200 - Created Challenge
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
 router.post('/', utilities.validateToken, utilities.isAdmin,
 body('description').notEmpty().escape().trim(),
 body('to_end').notEmpty().trim(),
 body('points').notEmpty().trim().isNumeric(),
 body('id_challenge_type').notEmpty().trim().isNumeric(),
 (req, res) => {
     const errors = validationResult(req);
     if (errors.isEmpty()) {
         challengesController.create(req, res);
     } else {
         res.status(404).json({ errors: errors.array() });
     }
 }
);

/**
 * @route DELETE /challenges/{challengeID}
 * @group Challenges Admin
 * @summary Delete Challenge
 * @param {integer} challengeID.path.required
 * @returns {object} 200 - Deleted challenge
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 404 - Not found challenge
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
 router.delete('/:challengeID', utilities.validateToken, utilities.isAdmin,
 param('challengeID').isNumeric(),
 (req, res) => {
     const errors = validationResult(req);
     if (errors.isEmpty()) {
         challengesController.delete(req, res);
     } else {
         res.status(404).json({ errors: errors.array() });
     }
 }
);

module.exports = router;