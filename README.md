# Cowie's-Weather-App
```
Coding challenge for a potential position at Go Nimbly
```

### Summary

This application was created for a coding challenge given by Go Nimbly.
The application required the use of the Weather API, and I have included the Google map API to add a cool feature to the app, which will be described below.

The Main purpose of the App is to display a 5 day weather forecast, for any city in the world, where the API contains data.

A user can click anywhere on the map, which will populate the latitude and longitude fields, and then clicking the 'Click For Weather' Button will display the forecast for that area.

The user can manually enter the latitude and longitude, followed by clicking the same button 'Click For Weather,' in order to get the forecast.

The user can select the 10 most recently searched cities, from the dropdown, which will populate the latitude and longitude fields, followed by the same, 'Click For Weather' button, in order to get the forecast.
The values for this dropdown are saved in the database and the server request controls the fact that only the 10 most recent cities are returned.

### Requirements

Node 10.15.0

Nodemon

Webpack

MySQL 5.7

### Usage

```
1. Fork and clone the repository
2. In the terminal and within the project directory run 'npm install'
3. Follow the directions in config.example.js, in order to set-up your database config file.
4. If you have a MySQL password, in the terminal, run 'mysql -u root -p < schema.sql' and enter your password
otherwise run 'mysql -u root < schema.sql'
5. In a separate terminal run 'npm run react-dev'
6. In a separate terminal run 'npm run server'
7. Go to http://localhost:2222
8. Click the map for a location, manually enter a longitude and latitude, or select a recent city from the dropdown and then click 'Click For Weather'
```