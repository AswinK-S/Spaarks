const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()
const {validteRegitration} = require('../middlewares/registrationMiddleware')

router.post('/register',validteRegitration,userController.register)

module.exports = router


