module.exports = (sequelize, DataTypes) => {
    const BadgeLevel = sequelize.define("badge_level", {
        id_badge_level: {
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
        to_get: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                notNull: { msg: "to_get cannot be null!" }
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
    return BadgeLevel;
};
