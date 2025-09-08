const mongodb = require('../db/connect');

const getData = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('user').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]); // devuelve solo el primer usuario con todos los campos
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getData };
