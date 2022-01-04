const db = require('../models/db.js');
const ChallengeType = db.challenge_type;

// Create new challenge_type
exports.create = async (req, res) => {
    try {
        await ChallengeType.create({
            description: req.body.description,
            color: req.body.color,
            img_name: req.body.img_name,
        });
        return res.status(201).json({ message: 'Challenge_type was created successfully.' });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// Show all challenge_types
exports.findAll = async (req, res) => {
    try {
        let data = await ChallengeType.findAll({});
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving challenge_types.' });
    }
};

// Delete challenge_type
exports.delete = async (req, res) => {
    try {
        const challenge_type = await ChallengeType.findByPk(req.params.challengeTypeID);
        if (!challenge_type) {
            return res.status(404).json({ message: `Not found challenge_type with id_challenge_type=${req.params.challengeTypeID}.` });
        } else {
            ChallengeType.destroy({ where: { id_challenge_type: req.params.challengeTypeID } });
            return res.status(200).json({ message: `Deleted challenge_type with id_challenge_type=${req.params.challengeTypeID}.` });
        }
    } catch (err) {
        return res.status(500).json({ message: `Error deleting challenge_type with id_challenge_type=${req.params.challengeTypeID}.` });
    }
};