const {body,validationResult} = require('express-validator')

//Registration validation rules
const validteRegitration =[
    body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min:3})
    .withMessage('Name must be at least 3 characters long'),

    body('email')
    .isEmail()
    .withMessage('please enter a valid email'),

    body('password')
    .isLength({min:6})
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*\d)(?=.[a-z])(?=.*[A-Z]).{6,}$/)
    .withMessage('Password must include at least one number, one uppercase letter, and one lowercase letter'),

    (req,res,next)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        next()
    }

]

module.exports ={
    validteRegitration
}
