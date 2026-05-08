const Product=require('../models/Product')
const jwt=require('jsonwebtoken')

async function cartManagement(req,res){
    res.send({message:"Product added"})
}

module.exports={
    cartManagement
}