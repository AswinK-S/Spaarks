const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const adminAuth = require('../middlewares/adminAuth')
const {validateRestaurant} = require('../middlewares/restaurantValidation')



router.post('/login',adminController.login)
router.post('/logout',adminController.logout)

router.post('/createRestaurant',adminAuth,validateRestaurant,adminController.createRestaurant)
router.post('/update/:id',adminAuth,validateRestaurant,adminController.updateRestaurant)
router.post('/delete',adminAuth,adminController.deleteRestaurant)
router.post('/getrestaurants',adminAuth,adminController.getRestaurants)

module.exports = router