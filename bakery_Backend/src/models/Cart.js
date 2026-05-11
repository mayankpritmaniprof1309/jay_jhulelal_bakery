const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
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

const cartSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
              ref: 'User',      // links to the User model
              required: true,
    },
    items:[cartItemSchema]
})

module.exports=mongoose.model('Cart',cartSchema)