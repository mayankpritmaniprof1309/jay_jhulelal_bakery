// ─────────────────────────────────────────────
//  models/Product.js  —  MongoDB Product Schema
// ─────────────────────────────────────────────
//
//  Mirrors the product objects currently
//  hardcoded in App.jsx. Once the backend is
//  running, the frontend fetches products from
//  here instead.
//

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    qty: {
      type: String,      // e.g. "piece", "box", "kg"
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 100,      // how many available
      min: 0,
    },
    category: {
      type: String,
      enum: ['cake', 'pastry', 'bread', 'cookies', 'drinks', 'other'],
      default: 'other',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
