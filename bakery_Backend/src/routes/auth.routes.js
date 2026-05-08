const express=require('express')
const jwt=require('jsonwebtoken')
const authController=require('../controllers/auth.controller')
const User=require('../models/User')
const authMiddleware=require('../middleware/auth.middleware')
const cartController=require('../controllers/cart.controller')

const router=express.Router()
// router.get('/',authProtectMiddleware,Homepage)
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)

router.post('/admin/register',authController.registerAdmin)
router.post('/admin/login',authController.loginAdmin)
router.get('/admin/logout',authController.logoutAdmin)





module.exports=router