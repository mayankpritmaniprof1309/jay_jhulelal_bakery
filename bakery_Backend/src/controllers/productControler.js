const Product=require('../models/Product')

const getAllProduct=async(req,res)=>{
    try{
        const products=await Product.find({isAvailable:true})
        res.status(200).send({success:true,data:products})
    }catch(err){
        res.status(500).send({success:false,message:err.message})
    }
}

module.exports={ getAllProduct }