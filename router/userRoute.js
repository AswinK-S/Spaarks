const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()
const {validteRegitration} = require('../middlewares/registrationMiddleware')

router.post('/register',validteRegitration,userController.register)
router.post('/login',userController.login)
router.get('/logout',userController.logout)

module.exports = router


