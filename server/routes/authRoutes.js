// /routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { register, login} = require ('../controllers/authController.js');

// POST /api/auth/register
router.post('/register',
  [
    body('username').notEmpty().withMessage('Username required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password too short')

  ],
  register
);

// POST /api/auth/login
router.post('/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty()
  ],
  login
);

module.exports = router;
