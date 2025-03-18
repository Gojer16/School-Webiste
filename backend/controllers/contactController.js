const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/emailService');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Create contact entry
        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        // Send email notification
        const emailSent = await sendContactEmail(contact);

        res.status(201).json({
            success: true,
            data: contact,
            emailSent
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getMessages = async (req, res) => {
    try {
        const messages = await Contact.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update message status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateMessageStatus = async (req, res) => {
    try {
        const message = await Contact.findByPk(req.params.id);
        
        if (!message) {
            res.status(404);
            throw new Error('Message not found');
        }

        const updatedMessage = await message.update({
            status: req.body.status
        });

        res.json(updatedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    submitContact,
    getMessages,
    updateMessageStatus
}; 