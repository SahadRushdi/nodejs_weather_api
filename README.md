# NodeJS Backend Application With MongoDB 
This is a complete backend API creaated using Node.js and MongoDB Atlas to store users’ email, location and weather data.

## You can start this projet 
npm run dev

## Project is live at vercel Check it out
https://nodejs-weather-api.vercel.app/

## API TEST CASES FROM POSTMAN
GET  https://nodejs-weather-api.vercel.app/api/users   select *

POST https://nodejs-weather-api.vercel.app/api/users  add users

GET  https://nodejs-weather-api.vercel.app/api/users/sahadrushdi@gmail.com  search by specific email

PUT  https://nodejs-weather-api.vercel.app/api/users/sahadrushdi@gmail.com   to update location
{
  "location": ""
}
	
GET  https://nodejs-weather-api.vercel.app/api/users/saadrushdi369@gmail.com/weather  displays weather of a user from his email.
