module.exports = (sequelize, DataTypes) => {
    const UserBadge = sequelize.define("user_badge", {
        id_user_badge: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "id_user cannot be null!" }
            }
        },
        id_badge_board: {
            type: DataTypes.INTEGER,
        },
        id_badge_level: {
            type: DataTypes.INTEGER,
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return UserBadge;
};
