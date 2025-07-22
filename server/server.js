const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { decryptRequest, encryptResponse} = require('./middlewares/encryptionMiddleware');
const authRoutes = require('./routes/authRoutes');



dotenv.config();
const app = express();
require('./db'); // Import the database connection

// STEP 1: Apply security & JSON parsers
app.use(cors());
app.use(helmet());
app.use(express.json());

// STEP 2: Decrypt the request body before routing (if encrypted)
app.use(decryptRequest);  // Custom crypto middleware


// STEP 3: Route handling
app.use('/api/auth', authRoutes);       // Auth endpoints

// STEP 4: Encrypt response body before sending to client
app.use(encryptResponse); // Custom crypto middleware

// STEP 5: Launch server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});