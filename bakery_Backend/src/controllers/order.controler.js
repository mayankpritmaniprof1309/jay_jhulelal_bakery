const jwt=require('jsonwebtoken')
const Order=require('../models/Order')

const { sendOrderConfirmationEmail } =require('./emailService')

async function placeOrder(req, res) {
    try {
        const { items, deliveryAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order must have at least one item" });
        }

        const formattedItems = items.map(item => ({
      product:  item.product,        // required by orderItemSchema
      name:     item.name,
      image:    item.image,
      price:    item.price,
      quantity: item.quantity,
    }))

        const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const order = await Order.create({
            user: req.user._id, // ✅ comes from middleware, no token logic needed
            items:formattedItems,
            totalPrice,
            deliveryAddress,
            status: 'pending',
            isPaid: false,
        });

        await sendOrderConfirmationEmail(
        req.user.email,
        `${req.user.firstName} ${req.user.lastName}`,
      {
        items: formattedItems,   // items 
        total: totalPrice,       // total cart amount
      }
    )

        return res.status(201).json({
            message: "Order placed successfully",
            data: order,
        });


    } catch (err) {
        console.error('FULL ERROR:', err)
        return res.status(500).json({ message: err.message });
    }
}
module.exports={
    placeOrder
}