const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const initDb = async () => {
  if (_db) return _db;

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  _db = client.db(); // esto devuelve la DB
  console.log('MongoDB connected');
  return _db;
};

const getDb = () => {
  if (!_db) throw new Error('Database not initialized');
  return _db; // _db ya es la DB, NO necesitas .db() después
};

module.exports = { initDb, getDb };
