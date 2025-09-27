const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API'
  },
  host: 'cse341-kzf0.onrender.com',
  schemes: ['https']
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/app.js']; // Cambia a app.js en lugar de contacts.js

swaggerAutogen(outputFile, endpointsFiles, doc);