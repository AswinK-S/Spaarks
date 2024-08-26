const express = require('express')
require('dotenv').config();

const connectDB = require('./config/db')
const app = express()

connectDB()
app.use(express.urlencoded({extended:true}))

const PORT =  process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})