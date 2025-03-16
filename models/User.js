const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    weatherData: [
        {
            date: {
                type: Date,
                default: Date.now,
            },
            description: String,
            temperature: Number,
            feels_like: Number,
            humidity: Number,
        },
    ],
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
