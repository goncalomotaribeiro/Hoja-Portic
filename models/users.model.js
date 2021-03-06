/**
 * @typedef Login
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef Signup
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} password_confirm.required
 */

/**
 * @typedef UpdateLoggedUserInfo
 * @property {string} name.required
 * @property {string} date_birth.required
 * @property {number} weight.required
 * @property {number} height.required
 * @property {number} health_activity_risk.required
 * @property {number} gender.required
 */

/**
 * @typedef CreateUser
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} password_confirm.required
 * @property {string} name.required
 * @property {string} date_birth.required
 * @property {number} weight.required
 * @property {number} height.required
 * @property {number} health_activity_risk.required
 * @property {number} gender.required
 * @property {boolean} is_admin.required
 */

/**
 * @typedef UpdateUser
 * @property {string} name.required
 * @property {string} date_birth.required
 * @property {number} weight.required
 * @property {number} height.required
 * @property {number} health_activity_risk.required
 * @property {number} gender.required
 * @property {boolean} is_admin.required
 */

/**
 * @typedef UpdatePassword
 * @property {string} password.required
 * @property {string} new_password.required
 * @property {string} new_password_confirm.required
 */

/**
 * @typedef UpdateMets
 * @property {number} mets.required
 */

/**
 * @typedef UpdateChallengesProgress
 * @property {string} running_time.required
 * @property {string} still_time.required
 * @property {string} walking_time.required
 * @property {string} bicycle_time.required
 */

/**
 * @typedef UpdatePicture
 * @property {string} picture.required
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
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
    date_birth: {
      type: DataTypes.DATEONLY,
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
    health_activity_risk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "health_activity_risk cannot be null!" }
      }
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "gender only accepts 0-male 1-female" }
      }
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
    },
    daily_mets: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: { msg: "daily_mets cannot be null!" }
      }
    },
    level: {
      type: DataTypes.STRING,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: "is_admin only accepts true or false" }
      }
    },
    picture: {
      type: DataTypes.BLOB,
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
  return User;
};
