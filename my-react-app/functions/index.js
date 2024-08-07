const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const wtoraEmail = functions.config().gmail.email;
const wtoraPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: wtoraEmail,
    pass: wtoraPassword,
  }
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(400).send('Only POST requests are allowed');
    }

    const { name, email, message, phone, company } = req.body;

    const mailOptions = {
      from: "WTora Contact Form",
      to: "walter@wtora.ca",
      subject: 'New Message from WTora Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\nEmail Body: \n\n${message}`
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
