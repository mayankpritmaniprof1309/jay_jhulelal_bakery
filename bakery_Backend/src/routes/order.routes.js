const express=require('express')
const jwt=require('jsonwebtoken');
const Order=require('../controllers/order.controler') 
const middleware= require('../middleware/auth.middleware')

const router=express.Router()

router.post('/placeOrder',middleware.authProtectMiddleware,Order.placeOrder)

module.exports=router