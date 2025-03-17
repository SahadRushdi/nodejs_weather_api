const axios = require('axios');
require('dotenv').config();

const fetchWeather = async (location) => {
  const apiKey = process.env.WEATHER_API_KEY || "05a49e4f7f18a2ec0fa0362adf657f90";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const { weather, main, name } = response.data;

    return {
      location: name,
      description: weather[0].description,
      temperature: main.temp,
      feels_like: main.feels_like,
      humidity: main.humidity,
    };
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    return null; 
  }
};

module.exports = fetchWeather;