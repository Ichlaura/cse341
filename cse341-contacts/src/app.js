// app.js
const express = require('express');
const bodyParser = require('body-parser');

const mongodb = require('../db/connect');

const contactsRoutes = require('./routes/contacts');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware para parsear JSON
app.use(bodyParser.json());

// CORS (para permitir requests desde cualquier frontend)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rutas de Contacts
app.use('/contacts', contactsRoutes);

// Ruta de prueba básica
app.get('/', (req, res) => {
  res.send('Hello World! API de Contacts funcionando');
});

// Conexión a MongoDB y arranque del servidor
mongodb.initDb()
  .then(() => {
    app.listen(port, () => console.log(`Connected to DB and listening on ${port}`));
  })
  .catch(err => {
    console.error('Failed to start server', err);
  });
