require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('../db/connect');
const contactsRoutes = require('../routes/contacts');

const app = express();
const port = process.env.PORT || 8081;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    url: '/swagger-output.json'
  }
}));

// Routes
app.use('/contacts', contactsRoutes);

// Después de las rutas
app.get('/test', (req, res) => {
  res.json({ message: 'API working', timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.send('Hello World! API de Contacts funcionando');
});



//swagger  documentation

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conexión a MongoDB y arranque del servidor

mongodb.initDb()
  .then(() => {
    app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
  })
  .catch(err => console.error('Failed to start server', err));
