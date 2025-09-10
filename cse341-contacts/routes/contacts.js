const express = require('express');
const contactsController = require('../controllers/contacts');
const router = express.Router();

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.patch('/:id', contactsController.partialUpdateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
