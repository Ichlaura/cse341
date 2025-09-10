require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('../db/connect');
const contactsRoutes = require('../routes/contacts');

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rutas
app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World! API de Contacts funcionando');
});

// Conexión a MongoDB y arranque del servidor
mongodb.initDb()
  .then(() => {
    app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
  })
  .catch(err => console.error('Failed to start server', err));
