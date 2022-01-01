const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(err => {
        console.error('Not connected to database!', err);
    });

const db = {};
db.sequelize = sequelize;

// db.activity = require('./activity.model.js')(sequelize, DataTypes);
// db.activity_type = require('./activity_type.model.js')(sequelize, DataTypes);
// db.badge_leaderboard = require('./badge_leaderboard.model.js')(sequelize, DataTypes);
// db.badge_level = require('./badge_level.model.js')(sequelize, DataTypes);
// db.challenge = require('./challenge.model.js')(sequelize, DataTypes);
// db.challenge_type = require('./challenge_type.model.js')(sequelize, DataTypes);
db.user = require('./user.model.js')(sequelize, DataTypes);

// db.user.belongsToMany(db.badge_leaderboard, { through: 'user_badge', foreignKey: 'id_user'});
// db.badge_leaderboard.belongsToMany(db.user, { through: 'user_badge', foreignKey: 'id_badge_board'});

// db.user.belongsToMany(db.badge_level, { through: 'user_badge', foreignKey: 'id_user'});
// db.badge_level.belongsToMany(db.user, { through: 'user_badge', foreignKey: 'id_badge_level'});

db.sequelize.sync()
    .then(() => {
        console.log('Database was synchronized successfully.');
    })
    .catch(e => {
        console.log(e);
    });

module.exports = db;
    