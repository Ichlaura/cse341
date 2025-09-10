const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/**
 * GET /contacts
 * Returns all contacts from the collection
 */
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /contacts/:id
 * Returns a single contact by ID
 */
const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await mongodb.getDb().collection('contacts')
      .find({ _id: new ObjectId(id) })
      .toArray();

    if (!result[0]) return res.status(404).json({ message: 'Contact not found' });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /contacts
 * Creates a new contact
 */
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor || null,
      birthday: req.body.birthday || null
    };

    const result = await mongodb.getDb().collection('contacts').insertOne(contact);

    res.status(201).json({ message: 'Contact created', contactId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * PUT /contacts/:id
 * Replaces a contact completely
 */
const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor || null,
      birthday: req.body.birthday || null
    };

    const result = await mongodb.getDb().collection('contacts')
      .replaceOne({ _id: new ObjectId(id) }, contact);

    if (result.matchedCount === 0) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json({ message: 'Contact updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * PATCH /contacts/:id
 * Updates a contact partially
 */
const partialUpdateContact = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await mongodb.getDb().collection('contacts')
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });

    if (result.matchedCount === 0) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json({ message: 'Contact partially updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /contacts/:id
 * Deletes a contact
 */
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await mongodb.getDb().collection('contacts')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'Contact not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export all functions
module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  partialUpdateContact,
  deleteContact
};
