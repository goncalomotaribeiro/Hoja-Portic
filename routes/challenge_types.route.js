const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require('express-validator')
const utilities = require('../utilities/utilities');
const challengesTypesController = require('../controllers/challenge_types.controller');

/**
* @route GET /challenge-types
* @group Challenge Types Admin - : Operations for challenge_types
* @summary Get all challenge_types
* @returns {object} 200 - An array of challenge_types info
* @returns {Error} 401 - Missing or bad authentication
* @returns {Error} 404 - Not found challenge_types
* @returns {Error} 400 - Bad request
* @security Bearer
*/
router.get('/', utilities.validateToken, utilities.isAdmin, challengesTypesController.findAll);

/**
 * @route POST /challenge-types
 * @group Challenges Admin
 * @param {CreateChallengeType.model} challenge_type.body.required
 * @summary Create new challenge_type
 * @returns {object} 200 - Created challenge_type
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
 router.post('/', utilities.validateToken, utilities.isAdmin,
 body('description').notEmpty().escape().trim(),
 body('color').notEmpty().escape().trim(),
 body('img_name').notEmpty().escape().trim(),
 (req, res) => {
     const errors = validationResult(req);
     if (errors.isEmpty()) {
         challengesTypesController.create(req, res);
     } else {
         res.status(404).json({ errors: errors.array() });
     }
 }
);

/**
 * @route DELETE /challenge-types/{challengeTypeID}
 * @group Challenge Types Admin
 * @summary Delete challenge_type
 * @param {integer} challengeTypeID.path.required
 * @returns {object} 200 - Deleted challenge_type
 * @returns {Error} 401 - Missing or bad authentication
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 404 - Not found challenge_type
 * @returns {Error} 400 - Bad request
 * @security Bearer
 */
 router.delete("/:challengeTypeID", utilities.validateToken, utilities.isAdmin,
 param("challengeTypeID").isNumeric(),
 (req, res) => {
     const errors = validationResult(req);
     if (errors.isEmpty()) {
         challengesTypesController.delete(req, res);
     } else {
         res.status(404).json({ errors: errors.array() });
     }
 }
);

module.exports = router;