require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const host = '127.0.0.1';

const authRoutes = require('./routes/auth.route')
const users = require('./routes/user.route');

// Swagger
const expressSwagger = require('express-swagger-generator')(app); 
const options = require('./utilities/swagger.config'); 
expressSwagger(options); 

app.use(express.json());
app.use(cors());

app.use('/api-docs', expressSwagger);
app.use('/', authRoutes) //auth
app.use('/users', users); //users

app.get('*', function (req, res) {
    res.status(404).json({ message: 'Route not defined!'});
});

app.listen(port, host, () => {
    console.log(`App listen: http://${host}:${port}/`)
    console.log(`Swagger Docs: http://${host}:${port}/api-docs`);
});