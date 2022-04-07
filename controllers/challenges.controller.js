const db = require('../models/db.js');
const Challenge = db.challenge;
const ChallengeType = db.challenge_type;

// Create new challenge
exports.create = async (req, res) => {
    try {
        await Challenge.create({
            description: req.body.description,
            to_end: req.body.to_end,
            points: req.body.points,
            completed: false,
            id_challenge_type: req.body.id_challenge_type
        });
        return res.status(201).json({ message: 'Challenge was created successfully.' });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};

// Show all challenges
exports.findAll = async (req, res) => {
    try {
        let data = await Challenge.findAll({
            attributes: ['id_challenge', 'description', 'to_end', 'points'],
            include: [
                {
                    model: ChallengeType, attributes: ["id_challenge_type", "description", "color", "img_name"]
                }
            ]
        });
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Some error occurred while retrieving challenges.' });
    }
};

// Delete challenge
exports.delete = async (req, res) => {
    try {
        const challenge = await Challenge.findByPk(req.params.challengeID);
        if (!challenge) {
            return res.status(404).json({ message: `Not found challenge with id_challenge=${req.params.challengeID}.` });
        } else {
            Challenge.destroy({ where: { id_challenge: req.params.challengeID } });
            return res.status(200).json({ message: `Deleted challenge with id_challenge=${req.params.challengeID}.` });
        }
    } catch (err) {
        return res.status(500).json({ message: `Error deleting challenge with id_challenge=${req.params.challengeID}.` });
    }
};