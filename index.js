const express = require('express')
require('dotenv').config();
const cookieParser = require('cookie-parser')
const PORT =  process.env.PORT || 5000
const router = require('./src/router/userRoute')
const adminRoute = require('./src/router/adminRoute')


const connectDB = require('./src/config/db')
const app = express()

connectDB()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',router)
app.use('/admin',adminRoute)


app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})