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


app.get('/weather/:lat/:long', async function(req, res) {
  const { lat, long } = req.params;
  const data = await axios.get(`https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02`);
  console.log(data.data)
  res.send(JSON.stringify(data.data));
});

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});