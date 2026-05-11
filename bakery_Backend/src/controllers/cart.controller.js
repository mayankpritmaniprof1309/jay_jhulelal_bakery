const Product=require('../models/Product')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const mongoose = require('mongoose');
const Cart = require('../models/Cart');

async function cartManagement(req,res){
  console.log("BODY:", req.body)  
    const {action,product,name,image,price,quantity=1}=req.body
    const userId=req.user._id //From middleware

    try{
        let cart= await Cart.findOne({user:userId})
        if(!cart){
            cart= new Cart({user:userId,items:[]})
        }

        if (action === "GET") {
            return res.json({ items: cart.items });
        }

        if (action === "ADD") {
      const existing = cart.items.find(
        (i) => i.product.toString() === product
      );
      if (existing) {
        // product already in cart just incressing the quantity
        existing.quantity += quantity;
      } else {
        // new product 
        cart.items.push({ product, name, image, price, quantity });
      }
    }

    if (action === "REMOVE") {
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== product
      );
    }

  if (action === "UPDATE") {
  const item = cart.items.find(
    (i) => i.product.toString() === product
  );
  if (item) {
    item.quantity = quantity;
  }
}

    if (action === "CLEAR") {
      cart.items = [];
    }

    await cart.save();
    return res.json({ items: cart.items });

    }catch(err){
        return res.status(500).json({ message: "Cart error", error: err.message });
    }
}


async function getUserByToken(req, res) {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Please login first" });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(decode.id) });
    res.send({user})
    res.send({"searching for id:":decode.id})
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ data: user });

    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}
module.exports={
    cartManagement,
    getUserByToken
}