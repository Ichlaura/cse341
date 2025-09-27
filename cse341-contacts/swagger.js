const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API'
  },
  host: 'cse341-contacts.onrender.com',
  schemes: ['https']
};

const outputFile = '../swagger-output.json';
const endpointsFiles = ['./routes/contacts.js']; // Ruta correcta

swaggerAutogen(outputFile, endpointsFiles, doc);