// /middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

  if (!token) {
    console.warn('JWT missing in request-----');
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Invalid JWT-----', err.message);
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }

    req.user = decoded; // user.id is now available in request
    console.log('Authenticated User ID-----', decoded.id);
    next();
  });
}

module.exports = verifyToken;
