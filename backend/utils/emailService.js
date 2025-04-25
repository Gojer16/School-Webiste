const nodemailer = require('nodemailer');
const config = require('../config/config');
const rateLimit = require('express-rate-limit');

// Create rate limiter for email sending
const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many email requests from this IP, please try again later.'
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: true, // Enforce SSL/TLS certificate validation
        minVersion: 'TLSv1.2' // Enforce minimum TLS version
    }
});

const validateEmailData = (data) => {
    const errors = [];
    if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
        errors.push('Invalid name');
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email address');
    }
    if (!data.subject || typeof data.subject !== 'string' || data.subject.length < 3) {
        errors.push('Invalid subject');
    }
    if (!data.message || typeof data.message !== 'string' || data.message.length < 10) {
        errors.push('Message too short');
    }
    return errors;
};

const sanitizeHtml = (str) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

const sendContactEmail = async (contactData) => {
    // Validate input data
    const validationErrors = validateEmailData(contactData);
    if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
    }

    // Sanitize input data
    const sanitizedData = {
        name: sanitizeHtml(contactData.name),
        email: contactData.email.toLowerCase().trim(),
        subject: sanitizeHtml(contactData.subject),
        message: sanitizeHtml(contactData.message)
    };

    const mailOptions = {
        from: config.EMAIL_FROM,
        replyTo: sanitizedData.email,
        to: config.EMAIL_FROM,
        subject: `Mensaje de ${sanitizedData.name}: ${sanitizedData.subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #150261;">Nuevo Mensaje de Contacto</h2>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                    <p><strong>Nombre:</strong> ${sanitizedData.name}</p>
                    <p><strong>Email:</strong> ${sanitizedData.email}</p>
                    <p><strong>Asunto:</strong> ${sanitizedData.subject}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
                </div>
            </div>
        `
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Email sending failed:', error);
        throw new Error('Failed to send email. Please try again later.');
    }
};

module.exports = {
    sendContactEmail
};
