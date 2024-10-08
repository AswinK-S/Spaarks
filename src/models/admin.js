const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        uniqueue:true,
    },
    password:{
        type:String,
        required:true
    }
})

const admin = mongoose.model('Admin',adminSchema)
module.exports = admin
