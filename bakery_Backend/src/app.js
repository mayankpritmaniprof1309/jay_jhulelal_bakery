//USES TO CREATE A SERVER

const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const app=express()
const authRoutes=require('../src/routes/auth.routes')
const cartRoutes=require('../src/routes/cart.routes')
const orderRoutes=require('../src/routes/order.routes')

const productRoutes=require('../src/routes/product.routes')

app.use(cors({
  origin: ["https://jay-jhulelal-bakery.vercel.app", "http://localhost:5173"], 
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/health', (req, res) => res.json({ status: 'ok' })); 

app.use('/api/cart',cartRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/product',productRoutes)
app.use('/api/order',orderRoutes)

module.exports =app;