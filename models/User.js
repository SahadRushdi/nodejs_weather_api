const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  weatherData: [
    {
      date: { type: Date, default: Date.now },
      weather: String,
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
