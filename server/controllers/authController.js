// /controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const db = require('../db');

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashed], (err) => {
    if (err) {
      console.error("MySQL error:", err);
      console.error('Register Error-----', err.message);
      return res.status(500).json({ error: 'Registration failed' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';

  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      console.error('Login Error or user not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};

module.exports = { register, login };
