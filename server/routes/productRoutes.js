const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

// Apply JWT to all routes
router.use(verifyToken);

// GET: List products
router.get('/', productController.getProducts);

// POST: Add product
router.post('/add-product',
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('description').optional().isString().withMessage('Description must be a string')
  ],
  productController.addProduct
);

// PUT: Edit product
router.put('/edit-product/:id', productController.editProduct);

// DELETE: Delete product
router.delete('/delete-product/:id', productController.deleteProduct);

module.exports = router;
