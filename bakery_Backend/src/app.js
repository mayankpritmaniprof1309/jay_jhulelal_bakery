//USES TO CREATE A SERVER

const express=require('express')
const cookieParser=require('cookie-parser')
const app=express()
const authRoutes=require('../src/routes/auth.routes')
const cartRoutes=require('../src/routes/cart.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use('/cart',cartRoutes)
app.use('/api/auth',authRoutes)

module.exports =app;