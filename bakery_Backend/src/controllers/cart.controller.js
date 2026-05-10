const Product=require('../models/Product')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const mongoose = require('mongoose');

async function cartManagement(req,res){
    res.send({message:"Product added"})
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