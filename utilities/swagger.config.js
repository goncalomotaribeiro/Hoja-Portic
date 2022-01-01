const options = {
    swaggerDefinition: {
        info: {
            title: 'Hoja API',
            version: '1.1',
        },
        host: 'localhost:3306',
        basePath: '/',
        produces: [
            "application/json"
        ],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "Bearer Token",
            }
        }
        
    },
    basedir: __dirname,
    files: ['../routes/**/*.js', '../models/**/*.js']
};

module.exports = options; 