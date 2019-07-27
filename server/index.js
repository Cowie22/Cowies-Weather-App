const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { getAllCities, addCity } = require('../database/index');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));


const PORT = process.env.PORT || 2222;


// In order to work the API there are a few restrictions
// 1. There are CORS errors, so the API call has to be made from the server using something like Express
// While using the cors middleware
// 2. One must make two requests to the API, unless they magically know an areas 'woeid'.  This first call
// Gives you the ten closest areas to the given longitude and latitude from the client.  The closest area
// Is then extracted and another request is made to get the five day forecast for that area.

// **** Normally I would have separated these two request to make the app more optimized, however the
// API docs do not want you to make too many request, and making a request every time a person clicks the
// Map or types in the input field, would go way over the recommended amount.

app.get('/weather/:lat/:lng', async function(req, res) {
  const { lat, lng } = req.params;
  const getLocation = await axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${lng}`);
  const locationID = getLocation.data[0].woeid;
  const weatherData = await axios.get(`https://www.metaweather.com/api/location/${locationID}`);
  res.send(JSON.stringify(weatherData.data));
});

// Get and Post to the database for cities
// Get requests ensures that only the ten most recent searches are displayed to the user
// Otherwise the UI dropdown would be far too long
app.get('/city', async function(req, res) {
  const getCityInfo = await getAllCities();
  let reducedCityInfo = getCityInfo[0].slice(getCityInfo[0].length - 10, getCityInfo[0].length);
  console.log('cityinfo', reducedCityInfo)
  res.send(reducedCityInfo)
})

app.post('/city', async function(req, res) {
  const info = req.body;
  const postCityInfo = await addCity(info);
  res.send(postCityInfo)
})

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});