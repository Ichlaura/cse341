const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: new ObjectId(id) }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]); // devuelve un solo contacto
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllContacts, getContactById };
