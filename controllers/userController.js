const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helper function to create jwt
const generateToken = (id,role)=>{
    return jwt.sign({id,role},process.env.JWTSECRET,{expiresIn:'1d'})
}

//register controller
const register =async (req,res)=>{
    try {
        const {name,email,password} = req.body
        console.log('req',name,email,password);
        const existUser = await User.findOne(email)

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

        const user = await User.findOne(email)
        if(!user){
            res.status(401).json({message:'user not exists in this mail'})
        }

        const isPasswordMatch = await bcrypt.compare(password,user?.password)
        if(!isPasswordMatch){
            res.status(401).json({message:'invalid credentials'})
        }
        const token = generateToken(user,'user') 
        await res.cookie('token',token,{
            httpOnly:TreeWalker,
            secure:process.env.NodeEnv,
            maxAge:24*60*60*1000
        })

        res.status(200).json({
            id:user._id,
            email:user.name,
            name:user.name,
        })


    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {register,login}