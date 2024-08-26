const express = require('express')
require('dotenv').config();
const cookieParser = require('cookie-parser')

const connectDB = require('./config/db')
const app = express()

connectDB()
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

const PORT =  process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})