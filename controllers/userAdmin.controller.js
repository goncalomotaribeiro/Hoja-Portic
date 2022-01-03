const db = require('../models/db.js');
const bcrypt = require('bcrypt');
const User = db.user;

// Create new user
exports.create = async (req, res) => {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });

        if (user) {
            return res.status(400).json({ message: 'Email already associated with account!' });
        }

        user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            name: req.body.name,
            date_birth: req.body.date_birth,
            weight: req.body.weight,
            height: req.body.height,
            gender: req.body.gender,
            points: 0,
            mets: 0,
            daily_mets: 0,
            is_admin: req.body.is_admin
        });

        return res.status(201).json({ message: 'User was created successfully.' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// Show all users
exports.findAll = async (req, res) => {
    try {
        let data = await User.findAll({});
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving users.' });
    }
};

// Find user
exports.findOne = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userID);
        if (user === null)
            res.status(404).json({ message: `Not found user with id ${req.params.userID}.` });
        else res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message || `Error retrieving user with id_user ${req.params.userID}.` });
    }
};

// Update user
exports.update = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userID);
        if (!user) {
            res.status(404).json({ message: `Not found user with id_user = ${req.params.userID}.` });
        } else {
            User.update(req.body, { where: { id_user: req.params.userID } });

            res.status(200).json({ message: `User id_user = ${req.params.userID} was updated successfully.` });
        }
    } catch (err) {
        res.status(500).json({ message: `Error updating user with id_user=${req.params.userID}.` });
    }
};

// Delete user
exports.delete = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userID);
      if (!user) {
        return res.status(404).json({ message: `Not found user with id_user=${req.params.userID}.`});
      } else {
        User.destroy({ where: { id_user: req.params.userID } });
        return res.status(200).json({ message: `Deleted user with id_user=${req.params.userID}.`});
      }
    } catch (err) {
      return res.status(500).json({ message: `Error deleting user with id_user=${req.params.userID}.`});
    }
  };