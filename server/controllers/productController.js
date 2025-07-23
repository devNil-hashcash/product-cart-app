const db = require("../db");
const { validationResult } = require("express-validator");

// add product
exports.addProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn("Validation failed:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price } = req.body;
  const query =
    "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";
  db.query(query, [name, description || "", price], (err, result) => {
    if (err) {
      console.error("Error adding product:", err.message);
      return res.status(500).json({ error: "DB error" });
    }
    console.log("Product added:", { id: result.insertId, name, price });
    res
      .status(201)
      .json({ message: "Product added", productId: result.insertId });
  });
};

// get all products
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err.message);
      return res.status(500).json({ error: "DB error" });
    }
    console.log("Fetched products----", results);
    res.json(results);
  });
};

// edit product
exports.editProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  // Validate ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const query =
    "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";

  db.query(query, [name, description, price, id], (err, result) => {
    if (err) {
      console.error("Error updating product:", err.message);
      return res.status(500).json({ error: "DB error" });
    }
    console.log("Update result----", result);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log("Product updated:", { id });
    res.json({ message: "Product updated" });
  });
};

//delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  // Validate ID
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const query = "DELETE FROM products WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err.message);
      return res.status(500).json({ error: "DB error" });
    }
    if (result.affectedRows === 0) {
      console.log(`Product with ID ${id} not found or already deleted`);
      return res.status(404).json({
        error: "Product not found",
        message: `No product exists with ID ${id}`,
      });
    }
    console.log("Product deleted:", id, "result----------", result);
    res.json({ message: "Product deleted" });
  });
};
