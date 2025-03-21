const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Now requiring User from the separate file
const fetchWeather = require('../utils/weatherService');
const mongoose = require('mongoose');

// POST route to add a user
router.post('/', async (req, res) => {
    const { email, location } = req.body;

    if (!email || !location) {
        return res.status(400).json({ msg: 'Please enter email and location' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ email, location });
        await user.save();

        res.status(201).json({ msg: 'User created successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET route to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET route to fetch a user by email
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update User Location route by email
router.put('/:email', async (req, res) => {
    const { location } = req.body;

    try {
        let user = await User.findOne({ email: req.params.email });

        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.location = location;
        await user.save();

        res.json({ msg: 'Location updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET user weather by email
router.get('/:email/weather', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) return res.status(404).json({ msg: 'User not found' });

        const weatherData = await fetchWeather(user.location);

        if (!weatherData)
            return res.status(500).json({ msg: 'Failed to fetch weather data' });

        // Save weather data to the user document
        user.weatherData.push({
            description: weatherData.description,
            temperature: weatherData.temperature,
            feels_like: weatherData.feels_like,
            humidity: weatherData.humidity,
        });

        await user.save();

        res.json({
            email: user.email,
            location: weatherData.location,
            weather: weatherData.description,
            temperature: `${weatherData.temperature}°C`,
            feels_like: `${weatherData.feels_like}°C`,
            humidity: `${weatherData.humidity}%`,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET route to fetch users from  a specific date
router.get('/:email/weather/:date', async (req, res) => {
    const { email, date } = req.params; // Extract email and date from URL parameters

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const requestedDate = new Date(date); 

        const weatherOnRequestedDate = user.weatherData.find(
            (entry) => new Date(entry.date).toISOString().split('T')[0] === requestedDate.toISOString().split('T')[0]
        );

        if (!weatherOnRequestedDate) {
            return res.status(404).json({ msg: `No weather data found for ${date}` });
        }

        res.json({
            email: user.email,
            location: user.location,
            date: weatherOnRequestedDate.date,
            description: weatherOnRequestedDate.description,
            temperature: `${weatherOnRequestedDate.temperature}°C`,
            feels_like: `${weatherOnRequestedDate.feels_like}°C`,
            humidity: `${weatherOnRequestedDate.humidity}%`,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;