const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const wtoraEmail = functions.config().gmail.email; //email.address
const wtoraPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  //host: 'smtp-mail.outlook.com',
  //port: 587,
  //secure: false,
  auth: {
    user: wtoraEmail,
    pass: wtoraPassword,
  // },
  // tls: {
  //   ciphers: 'SSLv3'
  }
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(400).send('Only POST requests are allowed');
    }

    const { name, email, message, phone, company } = req.body;

    const mailOptions = {
      from: email,
      to: "kyletora1@gmail.com",
      subject: 'New Message from WTora.ca Contact Forms',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\nEmail Body: \n\n${message}`
    };
    console.log(mailOptions);
    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Failed to send email');
    }
  });
});
