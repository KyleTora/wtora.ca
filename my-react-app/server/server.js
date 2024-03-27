const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MYSQL1k2t3!.',
  database: 'my_blog_database'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

app.get('/api/posts', (req, res) => {
  const { type } = req.query;
  let sqlQuery = 'SELECT * FROM blogs';

  // Check if type is provided and if it's 'featured'
  if (type === 'featured') {
    sqlQuery += ' WHERE isFeatured = 1';
  }

  pool.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching posts from database:', err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    } else {
      res.json(results);
    }
  });
});


app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;

  pool.query('SELECT * FROM blogs WHERE id = ?', postId, (err, results) => {
    if (err) {
      console.error('Error fetching blog post from database:', err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Blog post not found' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

app.post('/api/posts', (req, res) => {
  const { title, heading, text, date, isFeatured } = req.body;
  const newPost = { title, heading, text, date, isFeatured };

  pool.query('INSERT INTO blogs SET ?', newPost, (err, result) => {
    if (err) {
      console.error('Error creating new post:', err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    } else {
      console.log('New post created:', result.insertId);
      res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
    }
  });
});

app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;

  pool.query('DELETE FROM blogs WHERE id = ?', postId, (err, result) => {
    if (err) {
      console.error('Error deleting blog post:', err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Blog post not found' });
      } else {
        res.json({ message: 'Blog post deleted successfully' });
      }
    }
  });
});

// mail

app.post('/submit_form', (req, res) => {
  const { name, email, company, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kyletora1@gmail.com',
      pass: 'pscr qczg eypt tlgp'
    }
  });

  // Define email options

  const mailOptions = {
    from: email,
    to: 'kyletora1@gmail.com',
    subject: `New message from ${name}`,
    text: `
      Name: ${name}
      Company: ${company}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
