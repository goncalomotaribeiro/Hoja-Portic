const options = {
    swaggerDefinition: {
        info: {
            // description: 'Cars Store API',
            title: 'Cars Store API',
            version: '1.0.0',
        },
        host: 'localhost:8080',
        basePath: '/',
        produces: [
            "application/json"
        ],
        // schemes: ['https'],
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