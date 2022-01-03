const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require('express-validator')
const utilities = require('../utilities/utilities');
const usersController = require('../controllers/loggedUser.controller');

// /**
//  * @route PUT /logged-user/{userID}
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