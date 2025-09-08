const express = require('express');
const contactsController = require('../controllers/contacts');

const router = express.Router();

// GET all contacts
router.get('/', contactsController.getAllContacts);

// GET one contact by ID
router.get('/:id', contactsController.getContactById);

module.exports = router;
