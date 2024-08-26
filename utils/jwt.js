const jwt = require('jsonwebtoken')


//helper function to create jwt
const generateToken = (user,role)=>{

    const payload={
        id:user._id,
        mail:user.email,
        role:role
    }

    const secretKey = process.env.JWTSECRET
    const expiresIn = role === 'admin' ? '15m' : '1d'
    const options = {expiresIn:expiresIn}

    return jwt.sign(payload,secretKey,options)
}

module.exports = generateToken