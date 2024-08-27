const Admin = require('../models/admin')
const Restaurant = require('../models/restaurant')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/jwt')


const login = async(req,res)=>{
    try {
        const {email,password} =req.body
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(401).json({message:'admin does not exists'})
        }
        const isPasswordMatch = await bcrypt.compare(password,admin?.password)

        if(!isPasswordMatch){
            return res.status(401).json({message:'invalid credentials'})
        }

        const token = generateToken(admin,'admin')
        console.log('token', token)
        await res.cookie('adminToken',token,{
            httpOnly:true,
            secure:false,
            maxAge:15*60*1000,
            sameSite: 'Strict'
        })
        res.status(200).json({message:'admin login success'}) 


    } catch (error) {
        console.error(error.message)
    }
}

const logout =async(req,res)=>{
    try {
        await res.clearCookie('adminToken')
        res.status(200).json({message:'admin logout successfull'})
    } catch (error) {
        console.log(error.message)
    }
}


// create restaurant 
const createRestaurant = async(req,res)=>{
    try{
        const restaurantData = req.body
        await Restaurant.create(restaurantData)
        res.status(200).json({message:'Restaurant created'})

    }catch(error){
        console.error(error.message)
    }
}


module.exports = {
    login,
    logout,
    createRestaurant
}