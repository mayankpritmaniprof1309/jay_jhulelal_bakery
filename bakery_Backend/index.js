//USED TO START A SERVER

const { configDotenv } = require('dotenv')
const app=require('./src/app')
const connectDB=require('./src/db/db')


connectDB()

app.listen(3000)