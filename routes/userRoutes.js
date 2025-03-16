const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

module.exports = router;
