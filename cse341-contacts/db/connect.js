const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const initDb = async () => {
  if (_db) return _db;
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  _db = client.db(); // selecciona la DB del URI
  console.log('MongoDB connected');
  return _db;
};

const getDb = () => {
  if (!_db) throw new Error('Database not initialized');
  return _db;
};

module.exports = { initDb, getDb };
