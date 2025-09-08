const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('../db/connect');
const contactsRoutes = require('../routes/contacts');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// CORS (opcional si vas a hacer fetch desde un frontend)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Aquí se conecta la ruta
app.use('/contacts', contactsRoutes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
