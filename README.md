# product-cart-app



✅ Full-Stack Developer Test Task (Backend Priority)
⏳ Deadline: 3 Days (8 hours/day)
Submit: Two separate ZIP files – one for backend and one for frontend (if built)
 📧 Email to: athar@hashcashconsultants.com
 🔧 Must prioritize backend first. Frontend is optional if time permits.

🧩 Task Objective:
Build a Product List & Cart Application backend with secure authentication, MySQL integration, validation, encryption, and if possible, add a simple frontend using React + Vite.

🔁 Development Priority:
✅ Phase 1 – BACKEND (MANDATORY)
Tech: Node.js + Express + MySQL
1️⃣ Authentication (JWT-based)
POST /register: Register user with password hashed using bcrypt


POST /login: Login and return JWT token


Protect all product routes using JWT


2️⃣ Product Management (CRUD)
GET /products: List products from MySQL


POST /add-product: Add product (use express-validator)


PUT /edit-product/:id: Edit product


DELETE /delete-product/:id: Delete product


Only one default user (no roles needed)


3️⃣ Cart Handling (API-based)
POST /add-to-cart: Add item to cart (store in MySQL or in-memory array)


GET /cart: Get cart items


PUT /cart/:id: Update quantity


DELETE /cart/:id: Remove from cart


4️⃣ Security
Use Node’s crypto module to:


Decrypt request body


Encrypt response body


Implement basic hashing in Axios interceptor if frontend is added



✅ Phase 2 – FRONTEND (IF TIME PERMITS)
Tech: React + Vite + Redux Toolkit + React-Bootstrap
Features (only if backend is working and time remains):
Login & registration forms


Product list view with modal form for adding/editing product


Add to cart with Redux Toolkit


Separate Cart Page showing:


Product name, quantity, total price


Use localStorage to persist cart after reload


Setup Axios Interceptors to handle encryption/decryption



⚙️ Tech Stack
Layer
Tech
Frontend
React + Vite, Redux Toolkit, Axios, React-Bootstrap, Font Awesome
Backend
Node.js, Express.js
Database
MySQL
Auth
bcrypt, JWT
Validation
express-validator
Security
Node’s crypto module


🗂️ Suggested Folder Structure
/your-project
├── client/                # React + Vite (optional)
│   └── src/pages/
│   └── src/components/
│   └── src/store/
│   └── src/utils/
├── server/                # Node.js (mandatory)
│   └── routes/
│   └── controllers/
│   └── middlewares/
│   └── db.js
│   └── utils/


✅ Deliverables
Submit ZIP files of:


client/ (if built)


server/ (mandatory)


Do not include node_modules in submission


Focus on backend working completely


Optional frontend is appreciated only if time allows



