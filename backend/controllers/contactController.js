const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/emailService');
const { ValidationError, NotFoundError } = require('../errors');

/**
 * Contact form controller for handling public submissions and admin management
 * @class ContactController
 */

/**
 * Submit a new contact form message
 * @route POST /api/contact
 * @access Public
 */
const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            throw new ValidationError('All fields are required');
        }

        const contact = await Contact.create({ name, email, subject, message });
        await sendContactEmail(contact);

        res.status(201).json({
            success: true,
            message: 'Message submitted successfully',
            data: contact
        });
    } catch (error) {
        res.status(error.statusCode || 400).json({
            success: false,
            message: error.message || 'Error submitting contact form',
            error: error.message
        });
    }
};

/**
 * Retrieve all contact messages (Admin only)
 * @route GET /api/contact
 * @access Private/Admin
 */
const getMessages = async (req, res) => {
    try {
        const messages = await Contact.findAll({
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ['updatedAt'] }
        });
        
        res.json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error retrieving messages',
            error: error.message
        });
    }
};

/**
 * Update message status (Admin only)
 * @route PUT /api/contact/:id
 * @access Private/Admin
 */
const updateMessageStatus = async (req, res) => {
    try {
        const message = await Contact.findByPk(req.params.id);
        if (!message) throw new NotFoundError('Message not found');

        const validStatuses = ['new', 'in_progress', 'resolved'];
        if (!validStatuses.includes(req.body.status)) {
            throw new ValidationError('Invalid status value');
        }

        const updatedMessage = await message.update({ status: req.body.status });
        res.json({
            success: true,
            data: updatedMessage
        });
    } catch (error) {
        res.status(error.statusCode || 400).json({
            success: false,
            message: error.message || 'Error updating message status',
            error: error.message
        });
    }
};

module.exports = { submitContact, getMessages, updateMessageStatus };