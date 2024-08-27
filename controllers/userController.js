const User = require('../models/user')
const Restaurant = require('../models/restaurant');
const bcrypt = require('bcrypt')
const generateToken =require('../utils/jwt')



//register controller
const register =async (req,res)=>{
    try {
        const {name,email,password} = req.body
        console.log('req',name,email,password);
        const existUser = await User.findOne({email})

        if(existUser){
            res.status(400).json({message:'user exist in this mail'})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        await new User({name,email,password:hashedPassword}).save()
        res.status(201).json({message:'user created'})

        } catch (error) {
      console.log(error.message)  
    }
}


// login controller
const login = async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email,password);

        const user = await User.findOne({email})
        if(!user){
            res.status(401).json({message:'user not exists in this mail'})
            return
        }

        const isPasswordMatch = await bcrypt.compare(password,user?.password)
        if(!isPasswordMatch){
            res.status(401).json({message:'invalid credentials'})
            return
        }
        const token = generateToken(user,'user') 
        console.log('token', token)
        await res.cookie('userToken',token,{
            httpOnly:true,
            secure:process.env.NodeEnv,
            maxAge:24*60*60*1000
        })

        res.status(200).json({
            id:user._id,
            email:user.email,
            name:user.name,
            message:'login success'
        })


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Server error' });

    }
}


//userlogout
const logout = async(req,res)=>{
    try {
        await res.clearCookie('userToken')
        res.status(200).json({message:'logout successful'})
    } catch (error) {
        console.error(error.message)
    }
}



// Get restaurants within a specific radius
const getRestaurantsWithinRadius = async (req, res) => {
    try {
        const { latitude, longitude, radius, minimumDistance, maximumDistance } = req.query;

        // Ensure latitude and longitude are present
        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Latitude and longitude are required" });
        }

        const location = {
            $geoWithin: {
                $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], (radius || maximumDistance) / 6378100]
            }
        };

        // Handle max and min distance
        const distanceOptions = {};
        if (minimumDistance) {
            distanceOptions.$minDistance = parseFloat(minimumDistance);
        }
        if (maximumDistance) {
            distanceOptions.$maxDistance = parseFloat(maximumDistance);
        }

        // Find the restaurants within the radius or range
        const restaurants = await Restaurant.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    ...distanceOptions
                }
            }
        });

        console.log('res',restaurants);
        const formattedRestaurants = restaurants.map(restaurant => ({
            name: restaurant.name,
            description: restaurant.description,
            location: {
                latitude: restaurant.location.coordinates[1],
                longitude: restaurant.location.coordinates[0]
            },
            averageRating: (restaurant.ratings.reduce((a, b) => a + b, 0) / restaurant.ratings.length).toFixed(2),
            numberOfRatings: restaurant.ratings.length
        }));

        res.status(200).json(formattedRestaurants);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Get restaurants within a specific radius range
const getRestaurantsByRange = async (req, res) => {
    const { latitude, longitude, minimumDistance, maximumDistance } = req.query;

    try {
        const restaurants = await Restaurant.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    distanceField: 'distance',
                    minDistance: parseFloat(minimumDistance),
                    maxDistance: parseFloat(maximumDistance),
                    spherical: true
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    location: 1,
                    averageRating: { $avg: "$ratings" },
                    numberOfRatings: { $size: "$ratings" }
                }
            }
        ]);

        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = {
    register,
    login,
    logout,
    getRestaurantsWithinRadius,
    getRestaurantsByRange
}