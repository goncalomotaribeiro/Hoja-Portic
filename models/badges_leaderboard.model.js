module.exports = (sequelize, DataTypes) => {
    const BadgeLeaderboard = sequelize.define("badge_leaderboard", {
        id_badge_board: {
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
        points: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                notNull: { msg: "points cannot be null!" }
            }
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "number cannot be null!" }
            }
        },
        badge_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "badge_name cannot be null!" }
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return BadgeLeaderboard;
};
