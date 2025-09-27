const express = require('express');
const contactsController = require('../controllers/contacts');
const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', contactsController.getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Contact not found
 */
router.get('/:id', contactsController.getContactById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create new contact
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post('/', contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 */
router.put('/:id', contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Partially update contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 */
router.patch('/:id', contactsController.partialUpdateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;