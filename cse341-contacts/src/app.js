require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('../db/connect');
const contactsRoutes = require('../routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/contacts', contactsRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'API working', timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.send('API de Contacts funcionando');
});

// MongoDB connection
mongodb.initDb()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('Failed to start server', err));