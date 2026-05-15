const Product         = require('../models/Product');
const StorageServices = require('../services/storage.services');
const { v4: uuid }    = require('uuid');


// Get All Products
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true });
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};

// Add Product
async function addNewProduct(req, res) {
  try {
    const { name, desc, price, qty, rating, reviews, stock, category, isAvailable } = req.body;

    // Check if product already exists
    const existing = await Product.findOne({ name });
    if (existing) return res.status(400).send({ message: "Product Already Exists" });

    // Upload image to ImageKit
    let imageUrl = "";
    if (req.file) {
      const result = await StorageServices.uploadImage(req.file.buffer, uuid());
      imageUrl = result.url;
    }

    const newProduct = await Product.create({
      name, desc, price, qty, rating,
      reviews, stock, category, isAvailable,
      image: imageUrl,
    });

    return res.status(201).send({ message: "New Product Added", newProduct });
  } catch (err) {
    console.error("addNewProduct error:", err.message);
    return res.status(500).send({ message: err.message });
  }
}

// Update Product
async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ message: "Product Not Found" });

    const { name, desc, price, qty, rating, reviews, stock, category, isAvailable } = req.body;

    // Only update image if new file uploaded
    let imageUrl = product.image;
    if (req.file) {
      const result = await StorageServices.uploadImage(req.file.buffer, uuid());
      imageUrl = result.url;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, desc, price, qty, rating, reviews, stock, category, isAvailable, image: imageUrl },
      { new: true }
    );

    return res.status(200).send({ message: "Product Updated", product: updated });
  } catch (err) {
    console.error("updateProduct error:", err.message);
    return res.status(500).send({ message: err.message });
  }
}

// Delete Product
async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ message: "Product Not Found" });

    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: "Product Deleted" });
  } catch (err) {
    console.error("deleteProduct error:", err.message);
    return res.status(500).send({ message: err.message });
  }
}

// Low Stock routes
async function lowStock(req,res){
  const products = await Product.find({ stock: { $lt: 10 } }).sort({ stock: 1 });
  return res.status(200).json(products);
}
module.exports = { getAllProduct, addNewProduct, updateProduct, deleteProduct,lowStock };