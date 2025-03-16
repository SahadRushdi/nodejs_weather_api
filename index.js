require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// Basic route
app.get('/', (req, res) => res.send('✅ API is running...'));

// Server port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
