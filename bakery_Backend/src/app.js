//USES TO CREATE A SERVER

const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const app=express()
const authRoutes=require('../src/routes/auth.routes')
const cartRoutes=require('../src/routes/cart.routes')
const orderRoutes=require('../src/routes/order.routes')

const productRoutes=require('../src/routes/product.routes')

app.use(express.json())
app.use(cors({
origin: "http://localhost:5173",  // ← Exact URL, no wildcard
  credentials: true,
}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use('/cart',cartRoutes)
app.use('/api/auth',authRoutes)
app.use('/product',productRoutes)
app.use('/order',orderRoutes)

module.exports =app;