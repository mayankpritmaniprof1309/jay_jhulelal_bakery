const express=require('express')
const jwt=require('jsonwebtoken');
const Order=require('../controllers/order.controler') 
const middleware= require('../middleware/auth.middleware')

const router=express.Router()

router.post('/placeOrder',middleware.authProtectMiddleware,Order.placeOrder)

//For Admin
router.get('/getAllOrders',middleware.authProtectMiddleware,middleware.checkAdminMiddleware,Order.getAllOrders)

//populate users
router.get('/populateUsers',middleware.authProtectMiddleware,middleware.checkAdminMiddleware,Order.populateUsers)

//Update isPaid field
router.put('/updateIsPaid/:id',middleware.authProtectMiddleware,middleware.checkAdminMiddleware,Order.updateIsPaid)

//Update Status
router.put('/updateStatus/:id',middleware.authProtectMiddleware,middleware.checkAdminMiddleware,Order.updateStatue)

module.exports=router