const express=require('express')
const jwt=require('jsonwebtoken');
const Product=require('../controllers/productControler');

const router=express.Router();


router.get('/allProducts',Product.getAllProduct);

module.exports = router