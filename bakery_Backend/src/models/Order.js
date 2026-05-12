
const mongoose = require('mongoose');

// Sub-schema for each item in the order
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',     // links to the Product model
    required: true,
  },
  name:     { type: String,  required: true },  // snapshot at time of order
  image:    { type: String,  required: true },
  price:    { type: Number,  required: true },
  quantity: { type: Number,  required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',      // links to the User model
      required: true,
    },
    items: [orderItemSchema],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'processing', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending',
    },

    // Delivery address (optional for now)
    deliveryAddress: {
      street:  String,
      city:    String,
      pincode: String,
      phone:   String,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
