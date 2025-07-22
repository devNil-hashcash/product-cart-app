// /utils/cryptoHelper.js
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const ALGORITHM = 'aes-256-cbc';
const SECRET = process.env.CRYPTO_SECRET;
const IV = Buffer.alloc(16, 0); // Initialization vector

// 🔐 Encrypt response body
function encrypt(text) {
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET), IV);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// 🔓 Decrypt request body
function decrypt(text) {
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET), IV);
  let decrypted = decipher.update(text, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

module.exports = { encrypt, decrypt };
