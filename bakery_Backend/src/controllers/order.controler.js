const jwt=require('jsonwebtoken')
const Order=require('../models/Order')


async function placeOrder(req, res) {
    try {
        const { items, deliveryAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order must have at least one item" });
        }

        const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const order = await Order.create({
            user: req.user._id, // ✅ comes from middleware, no token logic needed
            items,
            totalPrice,
            deliveryAddress,
            status: 'pending',
            isPaid: false,
        });

        return res.status(201).json({
            message: "Order placed successfully",
            data: order,
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports={
    placeOrder
}