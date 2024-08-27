const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const adminAuth = require('../middlewares/adminAuth')
const {validateRestaurant} = require('../middlewares/restaurantValidation')



router.post('/login',adminController.login)
router.post('/logout',adminController.logout)

router.post('/createRestaurant',adminAuth,validateRestaurant,adminController.createRestaurant)

module.exports = router