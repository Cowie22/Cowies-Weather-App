const mysql = require('mysql2/promise');
const config = require('./config.js');

const pool = mysql.createPool(config)

// Gets all cities from database using async and await
async function getAllCities() {
  const queryStr = 'SELECT * FROM city';
  const result = await pool.query(queryStr);
  return result;
};

// Posts a new city to the database on user input
async function addCity(info) {
  const queryStr = 'INSERT INTO city (name, latitude, longitude) VALUES (?, ?, ?)';
  const params = [info.postCity, info.postLat, info.postLng];
  await pool.query(queryStr, params);
  return;
}

module.exports = {
  getAllCities, addCity
}