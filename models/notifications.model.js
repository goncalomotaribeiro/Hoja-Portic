/**
 * @typedef CreateNotification
 * @property {string} notification_badge
 * @property {string} description.required
 */

 module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define("notification", {
        id_notification: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        notification_badge: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "description cannot be null!" }
            }
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "id_user cannot be null!" }
            }
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
    return Notification;
};
