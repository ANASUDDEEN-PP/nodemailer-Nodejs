const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Create a transporter using Gmail's SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use false for port 587, true for port 465
    auth: {
        user: process.env.USER, // Sender email from .env
        pass: process.env.APP_PASSWORD, // App password from .env
    },
});

// Email options
const mailOptions = {
    from: {
        name: 'Anasuddeen',
        address: process.env.USER,
    },
    to: ['anasuddeenpp@gmail.com'], // Recipient email(s)
    subject: 'Send Email using NodeMailer',
    text: 'Hello world?', // Plain text body
    html: './index.html', // HTML body
};

// Function to send email
const sendMail = async () => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

// Call the sendMail function
sendMail();

// Start the Express server
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
