Back-end development for Hoja application

The Web Service was built based on the MVC (model-view-controller) architecture.
• It verifies and sanitizes all data and parameters sent in the HTTP requests.
• It has authentication, using OAUTH 2.0 and JWT.
• Code published on GitHub: https://github.com/goncalomotaribeiro/Hoja-Portic
• Web Service deploy to the Cloud through Heroku: https://hoja-portic.herokuapp.com
• Web Service documentation on Swagger: https://hoja-portic.herokuapp.com/api-docs


 Commands
npm init -y // to set up a new or existing npm package
npm install dotenv // is a zero-dependency module that loads environment variables from a .env
file into process.env
npm install express –save // to install express.js
npm install express-validator // provides validator and sanitizer functions
npm install bcrypt // a library to help hash passwords.
npm install cors // package for providing a Connect/Express middleware
npm install jsonwebtoken // to implement JSON Web Tokens
npm install mysql2 // to use mysql
npm install sequelize // to use sequelize as ORM (Object-relational mapping)
npm install swagger-ui-express // to serve auto-generated swagger-ui generated API docs from
express
npm install express-swagger-generator // to validate and generate swagger (OpenAPI) documentation
npm install --save node-cron // is tiny task scheduler in pure JavaScript for node.js
npm install nodemon --save-dev // it helps develop applications by automatically restarting...
npm install --save moment // to work with dates in JavaScript
npm run dev // start development server with nodemon
// npm run start // only for heroku deploy
