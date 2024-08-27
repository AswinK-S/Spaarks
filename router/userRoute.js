const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()
const {validteRegitration} = require('../middlewares/registrationMiddleware')
const userAuth = require('../middlewares/userAuth')


router.post('/register',validteRegitration,userController.register)
router.post('/login',userController.login)
router.get('/logout',userController.logout)
router.get('/restaurants',userAuth,userController.getRestaurantsWithinRadius);
router.get('/restaurants/range',userAuth, userController.getRestaurantsByRange);


module.exports = router


