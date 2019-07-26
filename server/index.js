const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));


const PORT = process.env.PORT || 2222;


// In order to work the API there are a few restrictions
// 1. their are CORS errors, so the API call has to be made from the server using something like Express
// While using the cors middleware
// 2. One must make two requests to the API, unless they magically know an areas 'woeid'.  This first call
// Gives you the ten closest areas to the given longitude and latitude from the client.  The closest area
// Is then extracted and another request is made to get the five day forecast for that area.

app.get('/weather/:lat/:lng', async function(req, res) {
  const { lat, lng } = req.params;
  const getLocation = await axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${lng}`);
  const locationID = getLocation.data[0].woeid;
  const weatherData = await axios.get(`https://www.metaweather.com/api/location/${locationID}`);
  console.log('data', weatherData.data);
  res.send(JSON.stringify(weatherData.data));
});

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});