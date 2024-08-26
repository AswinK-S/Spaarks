const User = require('../models/user')
const bcrypt = require('bcrypt')
const generateToken =require('../utils/jwt')



//register controller
const register =async (req,res)=>{
    try {
        const {name,email,password} = req.body
        console.log('req',name,email,password);
        const existUser = await User.findOne({email})

        if(existUser){
            res.status(400).json({message:'user exist in this mail'})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        await new User({name,email,password:hashedPassword}).save()
        res.status(201).json({message:'user created'})

        } catch (error) {
      console.log(error.message)  
    }
}


// login controller
const login = async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email,password);

        const user = await User.findOne({email})
        if(!user){
            res.status(401).json({message:'user not exists in this mail'})
            return
        }

        const isPasswordMatch = await bcrypt.compare(password,user?.password)
        if(!isPasswordMatch){
            res.status(401).json({message:'invalid credentials'})
            return
        }
        const token = generateToken(user,'user') 
        console.log('token', token)
        await res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NodeEnv,
            maxAge:24*60*60*1000
        })

        res.status(200).json({
            id:user._id,
            email:user.email,
            name:user.name,
            message:'login success'
        })


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Server error' });

    }
}


//userlogout
const logout = async(req,res)=>{
    try {
        await res.clearCookie('token')
        res.status(200).json({message:'logout successful'})
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = {
    register,
    login,
    logout
}