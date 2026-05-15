const express=require('express')
const jwt=require('jsonwebtoken')
const authController=require('../controllers/auth.controller')
const User=require('../models/User')
const authMiddleware=require('../middleware/auth.middleware')
const cartController=require('../controllers/cart.controller')
const middleware= require('../middleware/auth.middleware')

const router=express.Router()
// router.get('/',authProtectMiddleware,Homepage)
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)

router.post('/admin/register',authController.registerAdmin)
router.post('/admin/login',authController.loginAdmin)
router.get('/admin/logout',authController.logoutAdmin)


//For All Users
router.get('/admin/getAllUsers',middleware.authProtectMiddleware,middleware.checkAdminMiddleware,authController.getAllUsers)



//Reset Password
router.post('/user/requestPasswordReset',authController.requestPasswordReset)
router.post('/user/resetPassword',authController.resetPassword)

module.exports=router