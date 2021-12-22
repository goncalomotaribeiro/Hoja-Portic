const mongoose = require('mongoose');
mongoose.connect(process.env.STRING);

mongoose.authenticate()
    .then(() => {
        console.log("Ligação a base de dados efetuada.");
    })
    .catch(err => {
        console.error("Erro na conexão a base de dados.", err);
    });

const db = {};
db.mongoose = mongoose;

db.activities = require("../models/activities.model.js")(mongoose);
db.badges = require("../models/badges.model.js")(mongoose);
db.challenges = require("../models/challenges.model.js")(mongoose);
db.levels = require("../models/levels.model.js")(mongoose);
db.notifications = require("../models/notifications.model.js")(mongoose);
db.users = require("../models/users.model.js")(mongoose);

db.mongoose.sync()
    .then(() => {
        console.log("A sincronização com a base de dados foi realizada com sucesso.");
    })
    .catch(err => {
        console.log("Erro na sincronização a base de dados.", err);
    });

module.exports = db;