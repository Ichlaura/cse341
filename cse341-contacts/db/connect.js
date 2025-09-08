const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const initDb = async () => {
  if (_db) return _db;
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    _db = client.db(); // <-- esto selecciona la DB del URI
    console.log('MongoDB connected');
    return _db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};

const getDb = () => {
  if (!_db) throw new Error('Database not initialized');
  return _db;
};

module.exports = { initDb, getDb };
