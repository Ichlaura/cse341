require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect'); // Quita ../
const contactsRoutes = require('./routes/contacts'); // Quita ../
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(cors());

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Swagger documentation (SOLO UNA VEZ)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/contacts', contactsRoutes);

// Test endpoint (SOLO UNA VEZ)
app.get('/test', (req, res) => {
  res.json({ 
    message: 'API is working', 
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('Hello World! API de Contacts funcionando');
});

// Conexión a MongoDB
mongodb.initDb()
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });