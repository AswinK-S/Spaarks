const Admin = require('../models/admin')
const Restaurant = require('../models/restaurant')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/jwt')

// adminlogin 
const login = async(req,res)=>{
    try {
        const {email,password} =req.body
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(401).json({message:'admin does not exists'})
        }
        const isPasswordMatch = await bcrypt.compare(password,admin?.password)

        if(!isPasswordMatch){
            return res.status(401).json({message:'invalid credentials'})
        }

        const token = generateToken(admin,'admin')
        console.log('token', token)
        await res.cookie('adminToken',token,{
            httpOnly:true,
            secure:false,
            maxAge:15*60*1000,
            sameSite: 'Strict'
        })
        res.status(200).json({message:'admin login success'}) 


    } catch (error) {
        console.error(error.message)
    }
}

//admin logout
const logout =async(req,res)=>{
    try {
        await res.clearCookie('adminToken')
        res.status(200).json({message:'admin logout successfull'})
    } catch (error) {
        console.log(error.message)
    }
}


// create restaurant 
const createRestaurant = async(req,res)=>{
    try{
        const restaurantData = req.body
        await Restaurant.create(restaurantData)
        res.status(200).json({message:'Restaurant created'})

    }catch(error){
        console.error(error.message)
    }
}

// update the restaurant 
const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json({ message: 'Restaurant updated successfully', restaurant });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//delete the restaurants based on id
const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//get the details of all restaurants
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    login,
    logout,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurants
}