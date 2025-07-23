const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { body } = require('express-validator');
const verifyToken = require('../middlewares/authMiddleware');

// Apply JWT to all routes
router.use(verifyToken);

// Add to cart
router.post('/add-to-cart',
    [

        body('product_id').isInt({ gt: 0 }).withMessage('Valid product_id is required'),
        body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0')
  
    ], cartController.addToCart);

// Get cart items
router.get('/get-cartItems', cartController.getCartItems);

// Update quantity
router.put('/edit-cart/:id',
    [
        body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0')
  
    ], cartController.updateCartItem);

// Delete cart item
router.delete('/delete-cart/:id', cartController.removeCartItem);

module.exports = router;
