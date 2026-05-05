
//LOGIC TO CONNECT TO DATABASE. (WILL BE CALLED IN INDEX.JS)
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const app=require('../app')

const MONGO_URI=process.env.MONGO_URI
const PORT=process.env.PORT

function connectDB(){
    mongoose
    .connect(MONGO_URI)
    .then(()=>{
        console.log('DB Connected');
        app.listen(PORT,()=>{
            console.log(`App is Running of http://localhost:${PORT}`);
        })
    })
    .catch((err)=>{
        console.log('Mongo Db Connection error :'+err);
        process.exit(1);   
    })

}

module.exports=connectDB