/**
 * @typedef CreateChallengeType
 * @property {string} description.required
 * @property {string} color.required
 * @property {string} img_name.required
 */

module.exports = (sequelize, DataTypes) => {
    const ChallengeType = sequelize.define("challenge_type", {
        id_challenge_type: {
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
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "color cannot be null!" }
            }
        },
        img_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "img_name cannot be null!" }
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return ChallengeType;
};
