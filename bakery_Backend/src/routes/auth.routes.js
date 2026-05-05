const express=require('express')
const jwt=require('jsonwebtoken')
const authController=require('../controllers/auth.controller')
const User=require('../models/User')


const router=express.Router()

router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)



module.exports=router