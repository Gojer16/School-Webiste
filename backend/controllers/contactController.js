const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/emailService');
const { ValidationError, NotFoundError } = require('../errors');
const sanitizeHtml = require('sanitize-html');
const rateLimit = require('express-rate-limit');

// Validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Rate limiting for contact submissions
const contactRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many contact attempts, please try again later'
});

const sanitizeInput = (input) => sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {}
});

/** 
 * @class ContactController
 * Enhanced with input validation, sanitization, and security headers
 */

const submitContact = async (req, res) => {
    try {
        let { name, email, subject, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            throw new ValidationError('All fields are required');
        }

        // Sanitize inputs
        name = sanitizeInput(name).substring(0, 100);
        email = sanitizeInput(email).toLowerCase().substring(0, 254);
        subject = sanitizeInput(subject).substring(0, 200);
        message = sanitizeInput(message).substring(0, 2000);

        // Validate email format
        if (!isValidEmail(email)) {
            throw new ValidationError('Invalid email address');
        }

        const contact = await Contact.create({ 
            name, 
            email, 
            subject, 
            message 
        });

        await sendContactEmail(contact);

        // Security headers
        res.setHeader('Content-Security-Policy', "default-src 'self'");
        res.setHeader('X-Content-Type-Options', 'nosniff');

        res.status(201).json({
            success: true,
            message: 'Message submitted successfully',
            data: {
                id: contact.id,
                subject: contact.subject,
                createdAt: contact.createdAt
            }
        });

    } catch (error) {
        const statusCode = error.statusCode || 400;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            error: process.env.NODE_ENV === 'production' ? undefined : error.message
        });
    }
};

const getMessages = async (req, res) => {
    try {
        // Authorization check
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access'
            });
        }

        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: messages } = await Contact.findAndCountAll({
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'name', 'email', 'subject', 'status', 'createdAt'],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            count: messages.length,
            total: count,
            data: messages
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error retrieving messages',
            error: process.env.NODE_ENV === 'production' ? undefined : error.message
        });
    }
};

const updateMessageStatus = async (req, res) => {
    try {
        // Authorization check
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access'
            });
        }

        const message = await Contact.findByPk(req.params.id);
        if (!message) throw new NotFoundError('Message not found');

        const status = sanitizeInput(req.body.status).toLowerCase().trim();
        const validStatuses = ['new', 'in_progress', 'resolved'];

        if (!validStatuses.includes(status)) {
            throw new ValidationError('Invalid status value');
        }

        const updatedMessage = await message.update({ 
            status,
            updatedBy: req.user.id // Track who made the change
        });

        res.json({
            success: true,
            data: {
                id: updatedMessage.id,
                status: updatedMessage.status,
                updatedAt: updatedMessage.updatedAt
            }
        });

    } catch (error) {
        const statusCode = error.statusCode || 400;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            error: process.env.NODE_ENV === 'production' ? undefined : error.message
        });
    }
};

module.exports = { 
    submitContact: [contactRateLimiter, submitContact],
    getMessages,
    updateMessageStatus
};