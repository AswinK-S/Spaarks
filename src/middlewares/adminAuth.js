const jwt = require('jsonwebtoken')

const adminAuth = (req,res,next)=>{
    try {
        const token = req.cookies.adminToken
        if(!token){
            return res.status(401).json({message:'Unauthorized access'})
        }

        const decoded = jwt.verify(token,process.env.JWTSECRET)
        if(decoded.role !=='admin'){
            return res.status(403).json({message:'Forbidden: Access denied'})
        }
        
        next()

    } catch (error) {
      console.error(error.message) 
      res.status(401).json({ message: 'Unauthorized: Invalid token' }); 
    }
}

module.exports = adminAuth