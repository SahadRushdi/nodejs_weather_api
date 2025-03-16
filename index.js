require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Initialize app and DB
const app = express();
connectDB();

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => res.send('✅ API is running...'));

// User routes
app.use('/api/users', require('./routes/userRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
