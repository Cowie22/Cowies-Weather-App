import React from 'react';
import Fade from 'react-reveal/Fade';

const Weather = (props) => {
  const { weatherData } = props;
  // Simple object to make the background color of each day dynamic
  // But at the same time brings a lot of life to the display
  const colorAccordingToWeather = {
    sn: 'rgba(0, 210, 255, 0.5)',
    sl: 'rgba(102, 166, 255, 0.5)',
    h: 'rgba(63, 170, 212, 0.5)',
    t: 'rgba(97, 97, 97, 0.5)',
    hr: 'rgba(0, 91, 234, 0.5)',
    lr: 'rgba(7, 101, 133, 0.5)',
    s: 'rgba(60, 211, 173, 0.5)',
    hc: 'rgba(128, 128, 128, 0.5)',
    lc: 'rgba(192, 192, 192, 0.5)',
    c: 'rgba(247, 183,	51, 0.5)',
  }
  const celsiusToFahrenheit = (temp) => {
    let fahrenheit = (temp * (9/5)) + 32;
    return fahrenheit.toFixed(0)
  };

  let forecastData = weatherData.consolidated_weather.slice(0, 5).map((day, i) => {
    let color = colorAccordingToWeather[day.weather_state_abbr];
    let temp = celsiusToFahrenheit(day.the_temp);
    let maxTemp = celsiusToFahrenheit(day.max_temp);
    let minTemp = celsiusToFahrenheit(day.min_temp);
    return (
      <div className='inner-forecast-container' style={{backgroundColor: color}} key={i}>
        <div className='day-container'>
          <p className='date'>{day.applicable_date.slice(5)}</p>
          <p className='weather-type'>{day.weather_state_name}</p>
          <img
            className='weather-logo'
            // Ensures dynamic logo for each day's weather
            src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`}>
          </img>
        </div>
        <div className='temp-container'>
          <p className='temp'>Temp {'  '} {temp}˚F</p>
          <p className='temp'>Max {'  '} {maxTemp}˚F</p>
          <p className='temp'>Min {'  '} {minTemp}˚F</p>
        </div>
        <div className='misc-weather-container'>
          <p className='misc-weather'>Hum: {' '} {day.humidity}%</p>
          {/* KM to MPH conversion for wind speed */}
          <p className='misc-weather'>Wind {' '}{(day.wind_speed * 0.621371).toFixed(0)}mph</p>
        </div>
      </div>
    )
  });
  return (
    <Fade
    // Animation for smoother forecast display transition
      down
      duration={2000}
      distance={'800px'}
    >
    <div className='inner-weather-container'>
      <div className='weather-city-title'>
        <h1>{weatherData.title}</h1>
      </div>
      <div className='forecast-container'>
        {forecastData}
      </div>
    </div>
    </Fade>
  )
}

export default Weather