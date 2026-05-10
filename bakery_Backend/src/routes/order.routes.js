const express=require('express')
const jwt=require('jsonwebtoken');
const Order=require('../controllers/order.controler') 

const router=express.Router()

router.post('/placeOrder',Order.placeOrder)

module.exports=router