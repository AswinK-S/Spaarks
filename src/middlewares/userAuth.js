const jwt = require('jsonwebtoken')

// middleware to check user is authenticated or not 
const userAuth = (req,res,next)=>{
    try {
        const token = req.cookies.userToken
        if(!token){
            return res.status(401).json({message:'Unauthorized access'})
        }
        const decoded = jwt.verify(token,process.env.JWTSECRET)
        if(decoded.role !=='user'){
            return res.status(403).json({message:'Forbidden: Access denied'})
        }
        
        next()

    } catch (error) {
      console.error(error.message) 
      res.status(401).json({ message: 'Unauthorized: Invalid token' }); 
    }
}

module.exports = userAuth