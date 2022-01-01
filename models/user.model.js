/**
 * @typedef Login
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef User
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} name.required
 * @property {number} age.required
 * @property {number} weight.required
 * @property {number} height.required
 * @property {boolean} gender.required
 * @property {string} picture
 * @property {number} points.required
 * @property {number} mets.required
 * @property {number} daily_mets.required
 * @property {boolean} is_admin.required
 */

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "email cannot be null!" }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password cannot be null!" }
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name cannot be null!" }
        }
      },
      age: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notNull: { msg: "age cannot be null!" }
        }
      },
      weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notNull: { msg: "weight cannot be null!" }
        }
      },
      height: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notNull: { msg: "height cannot be null!" }
        }
      },
      gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "gender only accepts 0-male 1-female" }
        }
      },
      picture: {
        type: DataTypes.BLOB,
      },
      points: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notNull: { msg: "points cannot be null!" }
        }
      },
      mets: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notNull: { msg: "mets cannot be null!" }
        }
      }
      ,
      daily_mets: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notNull: { msg: "daily_mets cannot be null!" }
        }
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "is_admin only accepts 0-admin 1-user" }
        }
      }
    });
    return User;
  };
  