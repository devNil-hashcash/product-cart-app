const db = require('../db');
const { validationResult } = require('express-validator');

// add product
exports.addProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn('Validation failed:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price } = req.body;
  const query = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
  db.query(query, [name, description || '', price], (err, result) => {
    if (err) {
      console.error('Error adding product:', err.message);
      return res.status(500).json({ error: 'DB error' });
    }
    console.log('Product added:', { id: result.insertId, name, price });
    res.status(201).json({ message: 'Product added', productId: result.insertId });
  });
};

// get all products
exports.getProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      return res.status(500).json({ error: 'DB error' });
    }
    console.log('Fetched products----', results);
    res.json(results);
  });
};


// edit product
exports.editProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const query = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';

  db.query(query, [name, description, price, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err.message);
      return res.status(500).json({ error: 'DB error' });
    }
    console.log('✏️ Product updated:', { id });
    res.json({ message: 'Product updated' });
  });
};


//delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err.message);
      return res.status(500).json({ error: 'DB error' });
    }
    console.log('Product deleted:', id);
    res.json({ message: 'Product deleted' });
  });
};
