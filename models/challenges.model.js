/**
 * @typedef CreateChallenge
 * @property {string} description.required
 * @property {string} to_end.required
 * @property {string} points.required
 * @property {number} id_challenge_type.required
 */

module.exports = (sequelize, DataTypes) => {
    const Challenge = sequelize.define("challenge", {
        id_challenge: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "description cannot be null!" }
            }
        },
        to_end: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notNull: { msg: "to_end cannot be null!" }
            }
        },
        points: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                notNull: { msg: "points cannot be null!" }
            }
        },
        id_challenge_type: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
        },
    }, {
        freezeTableName: true,
    });
    return Challenge;
};
