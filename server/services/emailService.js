const nodemailer = require('nodemailer');

exports.emailService = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to,
        subject,
        text,
    };

    return await transporter.sendMail(mailOptions);
};
