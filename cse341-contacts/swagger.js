const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API'
  },
  host: 'cse341-kzf0.onrender.com',  // Usa ESTA URL que te dio Render
  schemes: ['https']
};

const outputFile = './swagger-output.json';  // Quita el ../
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);