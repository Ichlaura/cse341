const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API'
  },
  host: 'cse341-kzf0.onrender.com',
  schemes: ['https']
};



const swaggerUi = require('swagger-ui-express');
let swaggerDocument;

try {
  swaggerDocument = require('./swagger-output.json');
} catch (error) {
  console.log('Swagger file not found, using basic setup');
  swaggerDocument = {
    info: {
      title: 'Contacts API',
      description: 'Contacts API'
    }
  };
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);