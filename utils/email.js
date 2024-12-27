
const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});

const sendPasswordResetEmail = async (userEmail, resetToken) => {
    try {
        const tokenUrl = `${resetToken}`;
        
        const mailOptions = {
            from: config.email.from,
            to: userEmail,
            subject: 'Password Reset Request - Node Auth',
            html: `
                <h1>Password Reset</h1>
                <p>You requested a password reset. Copy the token below to reset your password:</p>
                <p href="${tokenUrl}">${tokenUrl}</p>
                <p>If you didn't request this, please ignore this email.</p>
                <p>This link will expire in 1 hour.</p>
            `
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Error sending password reset email');
    }
};

module.exports = {
    sendPasswordResetEmail
};
