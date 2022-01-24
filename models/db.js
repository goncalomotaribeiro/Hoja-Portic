const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
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
db.badge_leaderboard = require('./badges_leaderboard.model.js')(sequelize, DataTypes);
db.badge_level = require('./badges_level.model.js')(sequelize, DataTypes);
db.challenge = require('./challenges.model.js')(sequelize, DataTypes);
db.challenge_type = require('./challenge_types.model.js')(sequelize, DataTypes);
db.user_challenge = require('./user_challenges.model.js')(sequelize, DataTypes);
db.user_badge = require('./user_badges.model.js')(sequelize, DataTypes);
db.user = require('./users.model.js')(sequelize, DataTypes);
db.notification = require('./notifications.model.js')(sequelize, DataTypes);

db.user.belongsToMany(db.challenge, { through: 'user_challenge', foreignKey: 'id_user'});
db.challenge.belongsToMany(db.user, { through: 'user_challenge', foreignKey: 'id_challenge'});

db.user.hasMany(db.user_challenge, {foreignKey: 'id_user'});
db.user_challenge.belongsTo(db.user, {foreignKey: 'id_user'})

db.challenge.hasMany(db.user_challenge, {foreignKey: 'id_challenge'});
db.user_challenge.belongsTo(db.challenge, {foreignKey: 'id_challenge'})



db.user.belongsToMany(db.badge_leaderboard, { through: 'user_badge', foreignKey: 'id_user'});
db.badge_leaderboard.belongsToMany(db.user, { through: 'user_badge', foreignKey: 'id_badge_board'});

db.user.belongsToMany(db.badge_level, { through: 'user_badge', foreignKey: 'id_user'});
db.badge_level.belongsToMany(db.user, { through: 'user_badge', foreignKey: 'id_badge_level'});


// db.user.hasMany(db.user_badge, {foreignKey: 'id_user'});
// db.user_badge.belongsTo(db.user, {foreignKey: 'id_user'})

db.badge_leaderboard.hasMany(db.user_badge, {foreignKey: 'id_badge_board'});
db.user_badge.belongsTo(db.badge_leaderboard, {foreignKey: 'id_badge_board'})

// db.badge_level.hasMany(db.user_badge, {foreignKey: 'id_badge_level'});
// db.user_badge.belongsTo(db.badge_level, {foreignKey: 'id_badge_level'})


db.user.hasMany(db.notification, {foreignKey: 'id_user'});
db.notification.belongsTo(db.user, {foreignKey: 'id_user'})

db.challenge_type.hasMany(db.challenge, {foreignKey: 'id_challenge_type'});
db.challenge.belongsTo(db.challenge_type, {foreignKey: 'id_challenge_type'})

db.sequelize.sync()
    .then(() => {
        console.log('Database was synchronized successfully.');
    })
    .catch(e => {
        console.log(e);
    });

module.exports = db;
    