const {body,validationResult} = require('express-validator')

const validateRestaurant = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Restaurant name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Restaurant name must be between 3 and 100 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10, max: 500 })
        .withMessage('Description must be between 10 and 500 characters'),

    body('location.type')
        .equals('Point')
        .withMessage('Location type must be Point'),

    body('location.coordinates')
        .isArray({ min: 2, max: 2 })
        .withMessage('Coordinates must be an array of two numbers: [longitude, latitude]')
        .custom((value) => {
            const [longitude, latitude] = value;
            if (typeof longitude !== 'number' || typeof latitude !== 'number') {
                throw new Error('Coordinates must be numbers');
            }
            if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
                throw new Error('Coordinates must be within valid ranges: longitude (-180 to 180), latitude (-90 to 90)');
            }
            return true;
        }),

    body('ratings.*')
        .optional()
        .isFloat({ min: 1, max: 5 })
        .withMessage('Ratings must be between 1 and 5'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


module.exports = {validateRestaurant}