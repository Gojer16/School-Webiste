const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendContactEmail = async (contactData) => {
    const mailOptions = {
        from: config.EMAIL_FROM,  // Always use the configured sender email
        replyTo: contactData.email,  // Allows recipients to reply to the sender
        to: config.EMAIL_FROM,
        subject: `Mensaje de ${contactData.name}: ${contactData.subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #150261;">Nuevo Mensaje de Contacto</h2>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                    <p><strong>Nombre:</strong> ${contactData.name}</p>
                    <p><strong>Email:</strong> ${contactData.email}</p>
                    <p><strong>Asunto:</strong> ${contactData.subject}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p style="white-space: pre-wrap;">${contactData.message}</p>
                </div>
            </div>
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
