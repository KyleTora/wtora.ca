
// functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true }); // Enable CORS for all origins

admin.initializeApp();


const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

console.log(gmailEmail);

exports.sendEmail = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
  
    if (req.method !== 'POST') {
        return res.status(400).send('Only POST requests are allowed');
    }

    const { name, email, message } = req.body;

    const mailOptions = {
        from: gmailEmail,
        to: 'kyletora1@gmail.com',
        subject: 'New Message from Contact Form',
        text: `
        Name: ${name}\n
        Email: ${email}\n
        Message: ${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Failed to send email');
    }
  });
});