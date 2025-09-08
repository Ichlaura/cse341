// db/connect.js
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let _db;

const initDb = async () => {
  if (_db) {
    console.log('DB is already initialized!');
    return _db;
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
      tlsAllowInvalidCertificates: true, // necesario para Render
    });
    _db = client;
    console.log('Connected to MongoDB Atlas!');
    return _db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error('DB not initialized');
  }
  return _db;
};

module.exports = { initDb, getDb };
