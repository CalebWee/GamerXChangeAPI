const swaggerJsDoc = require('swagger-jsdoc');
const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'GamerXChange',
    description: 'Description',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app'); // Your project's root file
});
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'GamerXChange',
      version: '1.0.0',
      description: 'Online Game Account Marketplace',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
