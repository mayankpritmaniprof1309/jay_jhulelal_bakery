const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');
const Cart = require('../models/Cart');

async function cartManagement(req, res) {
  const { action, product, name, image, price, quantity = 1 } = req.body;
  const userId = req.user._id; // from middleware

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
      await cart.save(); 
    }

    if (action === "GET") {
      return res.json({ items: cart.items });
    }

    if (action === "ADD") {
      // validate required fields
      if (!product || !name || !price) {
        return res.status(400).json({ message: "Missing required fields: product, name, price" });
      }

      const existing = cart.items.find(
        (i) => i.product.toString() === product
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.items.push({ product, name, image, price, quantity });
      }
    }

    else if (action === "REMOVE") {
      if (!product) return res.status(400).json({ message: "Missing product id" });
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== product
      );
    }

    else if (action === "UPDATE") {
      if (!product || quantity < 1) {
        return res.status(400).json({ message: "Invalid product or quantity" });
      }
      const item = cart.items.find(
        (i) => i.product.toString() === product
      );
      if (item) {
        item.quantity = quantity;
      }
    }

    else if (action === "CLEAR") {
      cart.items = [];
    }

    else {
      return res.status(400).json({ message: `Unknown action: ${action}` });
    }

    await cart.save();
    return res.json({ items: cart.items });

  } catch (err) {
    console.error("Cart error:", err.message);
    return res.status(500).json({ message: "Cart error", error: err.message });
  }
}

async function getUserByToken(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Please login first" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select("-password"); 
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user }); 
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

module.exports = { cartManagement, getUserByToken };