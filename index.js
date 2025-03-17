const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected...'))
    .catch((err) => console.error('❌ MongoDB connection failed:', err));

// Import routes properly
const userRoutes = require('./routes/api/users');
app.use('/api/users', userRoutes);

// Base route
app.get('/', (req, res) => res.send('😊 Node.JS API is running on Vercel'));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
