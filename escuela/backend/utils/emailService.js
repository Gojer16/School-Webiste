const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
});

const sendContactEmail = async (contactData) => {
    const mailOptions = {
        from: config.EMAIL_FROM,
        to: config.EMAIL_USER, // Send to admin
        subject: `New Contact Form Submission: ${contactData.subject}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${contactData.message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

module.exports = {
    sendContactEmail
}; 