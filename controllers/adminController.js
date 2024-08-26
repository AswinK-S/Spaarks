const Admin = require('../models/admin')
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
            secure:process.env.NodeEnv,
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

module.exports = {
    login,
    logout
}