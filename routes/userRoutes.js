const express = require('express');
const router = express.Router();
const { addUser, updateUserLocation, getUserWeather } = require('../controllers/userController');

// Add a new user
router.post('/add', addUser);

// Update user location
router.put('/update/:email', updateUserLocation);

// Get user weather data for a day
router.get('/weather/:email', getUserWeather);

module.exports = router;
