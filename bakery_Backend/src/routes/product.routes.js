const express=require('express')
const jwt=require('jsonwebtoken');
const Product=require('../controllers/productControler');
const middleware=require('../middleware/auth.middleware')
const multer=require('multer')

const upload=multer({
    storage:multer.memoryStorage(),
})
const router=express.Router();


router.get('/allProducts',Product.getAllProduct);

//Add new Product
router.post('/newProduct',middleware.authProtectMiddleware,middleware.checkAdminMiddleware,upload.single('image'),Product.addNewProduct);

//Update Product
router.put('/updateProduct/:id',middleware.authProtectMiddleware,middleware.checkAdminMiddleware,upload.single('image'),Product.updateProduct);

//Delete Product
router.delete('/deleteProduct/:id',middleware.authProtectMiddleware,middleware.checkAdminMiddleware,Product.deleteProduct);

//Low Stock Product
router.get('/lowStock',middleware.authProtectMiddleware,middleware.checkAdminMiddleware,Product.lowStock);
module.exports = router