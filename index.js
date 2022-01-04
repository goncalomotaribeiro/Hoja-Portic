require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const host = 'localhost';

const authRoutes = require('./routes/auth.route')
const users = require('./routes/users.route');
const loggedUser = require('./routes/loggedUser.route');
const challenges = require('./routes/challenges.route');
const challengeTypes = require('./routes/challenge_types.route');

// Swagger
const expressSwagger = require('express-swagger-generator')(app); 
const options = require('./utilities/swagger.config'); 
expressSwagger(options); 

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use('/api-docs', expressSwagger);
app.use('/', authRoutes) //auth
app.use('/users', users); //users admin
app.use('/logged-user', loggedUser); //logged users
app.use('/challenges', challenges); //challenges
app.use('/challenge-types', challengeTypes); //challenge_types

app.get('*', function (req, res) {
    res.status(404).json({ message: 'Route not defined!'});
});

app.listen(port, host, () => {
    console.log(`App listen: http://${host}:${port}/`)
    console.log(`Swagger Docs: http://${host}:${port}/api-docs`);
});