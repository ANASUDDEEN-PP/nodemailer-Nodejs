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
    auth: {
        user: process.env.USER, // Sender email from .env
        pass: process.env.APP_PASSWORD, // App password from .env
    },
});

// Function to send email
const sendMail = async (userEmail, mailSubject, text) => {
    const mailOptions = {
        from: {
            name: 'Mailer Name',
            address: process.env.USER,
        },
        to: userEmail, // Recipient email
        subject: mailSubject,
        text: text, // Plain text body
        html: `<p>${text}</p>`, // Inline HTML body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

app.post('/api', (req,res) => {
    // Example usage
    const userEmail = "anasuddeenpp@gmail.com";
    const mailSubject = 'This is the forget Password Mail';
    const text = 'Your forget Password mail is generated';

    // Call the sendMail function
    var demoText = sendMail(userEmail, mailSubject, text);
    console.log(demoText);
})

// Start the Express server
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
