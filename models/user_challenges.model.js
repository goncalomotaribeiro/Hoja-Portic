module.exports = (sequelize, DataTypes) => {
    const UserChallenge = sequelize.define("user_challenge", {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: { msg: "progress cannot be null!" }
            }
        },
        id_challenge: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            validate: {
                notNull: { msg: "progress cannot be null!" }
            }
        },
        progress: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notNull: { msg: "progress cannot be null!" }
            }
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: { msg: "completed only accepts true or false" }
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return UserChallenge;
};
