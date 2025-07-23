const { encrypt, decrypt } = require("../utils/cryptohelper");


//  Decrypt incoming encrypted request body
function decryptRequest(req, res, next) {
  try {
    if (req.headers['x-encrypted'] === '1') {
      const decrypted = decrypt(req.body.encryptedData);
      req.body = JSON.parse(decrypted);
      console.log('Decrypted Body---', req.body);
    }
    next();
  } catch (err) {
    console.error('Failed to decrypt request---', err.message);
    return res.status(400).json({ error: 'Invalid encrypted request' });
  }
}

//  Encrypt all responses before sending
function encryptResponse(req, res, next) {
  const oldJson = res.json;
  res.json = function (data) {
    const encryptedData = encrypt(JSON.stringify(data));
    console.log('Sending Encrypted Response---', encryptedData);
    oldJson.call(res, { encryptedData });
  };
  next();
}

module.exports = { decryptRequest, encryptResponse };
