const express=require('express')
const jwt=require('jsonwebtoken')
const authMiddleware=require('../middleware/auth.middleware')
const cartController=require('../controllers/cart.controller')

const router=express.Router()

router.post('/',authMiddleware.authProtectMiddleware,cartController.cartManagement)
router.get('/getUserByToken',cartController.getUserByToken)

module.exports =router