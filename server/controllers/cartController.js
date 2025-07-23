const { validationResult } = require('express-validator');
const db = require('../db');

// Add item to cart
const addToCart = (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn("Validation failed:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  const query = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE quantity = quantity + ?`;

  db.query(query, [user_id, product_id, quantity, quantity], (err, result) => {
    if (err) {
      console.error('Add to cart error:', err);
      return res.status(500).json({ error: 'Failed to add to cart' });
    }
    console.log('Product added to cart');
    res.json({ message: 'Product added to cart' });
  });
};

// Get all cart items for the user
const getCartItems = (req, res) => {
  const user_id = req.user.id;

  const query = `
    SELECT cart.id, products.name, products.description, products.price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?`;

  db.query(query, [user_id], (err, rows) => {
    if (err) {
      console.error('Fetch cart error:', err);
      return res.status(500).json({ error: 'Failed to fetch cart items' });
    }
    res.json(rows);
  });
};

// Update quantity
const updateCartItem = (req, res) => {
  const cartId = req.params.id;
  const { quantity } = req.body;

  // Validate ID
  if (!cartId || isNaN(parseInt(cartId))) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const query = `UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?`;
  db.query(query, [quantity, cartId, req.user.id], (err, result) => {
    if (err) {
      console.error('Update cart error:', err);
      return res.status(500).json({ error: 'Failed to update cart item' });
    }
    res.json({ message: 'Cart item updated' });
  });
};

// Remove item from cart
const removeCartItem = (req, res) => {
  const cartId = req.params.id;
// Validate ID
  if (!cartId || isNaN(parseInt(cartId))) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  const query = `DELETE FROM cart WHERE id = ? AND user_id = ?`;
  db.query(query, [cartId, req.user.id], (err, result) => {
    if (err) {
      console.error('Remove cart item error:', err);
      return res.status(500).json({ error: 'Failed to remove cart item' });
    }
    if (result.affectedRows === 0) {
      console.log(`Product with ID ${cartId} not found or already deleted`);
      return res.status(404).json({
        error: "Product not found",
        message: `No product exists with ID ${cartId}`,
      });
    }
    res.json({ message: 'Cart item removed' });
  });
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem
};
