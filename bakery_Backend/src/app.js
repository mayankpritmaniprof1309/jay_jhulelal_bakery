//USES TO CREATE A SERVER

const express=require('express')
const cookieParser=require('cookie-parser')
const app=express()
const authRoutes=require('../src/routes/auth.routes')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/',(req,res)=>{
    res.send('hello world')
})


app.use('/api/auth',authRoutes)


module.exports =app;