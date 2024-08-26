const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        await  mongoose.connect(process.env.MongoURI)
        console.log('MongoDB Connected')
    } catch (error) {
        console.error(error.message)
    }
}


module.exports = connectDB