import React from 'react';

const Weather = (props) => {
  const { weatherData } = props;
  console.log('weather', weatherData)
  return (
    <div className='inner-weather-container'>
      <div className='weather-city-title'>
        <h1>{weatherData.title}</h1>
        <img src="https://www.metaweather.com/static/img/weather/s.svg"></img>
      </div>
    </div>
  )
}

export default Weather