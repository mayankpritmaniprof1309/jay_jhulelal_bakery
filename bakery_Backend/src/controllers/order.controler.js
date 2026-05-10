const jwt=require('jsonwebtoken')
const Order=require('../models/Order')


async function  placeOrder(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Please login first" });

        // Get user ID from token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { items, totalPrice, deliveryAddress } = req.body;

        // Validate required fields
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order must have at least one item" });
        }
        if (!totalPrice) {
            return res.status(400).json({ message: "Total price is required" });
        }

        // Create order
        const order = await Order.create({
            user: decoded.id,
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