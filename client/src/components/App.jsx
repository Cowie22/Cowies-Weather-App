import React from 'react';
import './Styles/Styles.scss';
import axios from 'axios';
import UserNavigation from './UserNavigation/UserNavigation.jsx';
import Map from './Map/Map.jsx';
import Weather from './Weather/Weather.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      currentLng: 0,
      currentLat: 0,
      mapClicked: false,
    };
    this.handleGetLngLat = this.handleGetLngLat.bind(this);
    this.handleManualVsMapInput = this.handleManualVsMapInput.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
  }

  getWeatherData(lat, lng) {
    // Remember to authenticate the number, maybe include an example
    // Typically this call would be made in component did mount, however for the purposes
    // Of this app is is called when the user requests weather data
    axios.get(`/weather/${lat}/${lng}`)
      .then(res => {
        this.setState({
          weatherData: res.data,
        })
      })
  }

  handleGetLngLat(event) {
    this.setState({
      currentLng: event.lng.toFixed(4),
      currentLat: event.lat.toFixed(4),
      mapClicked: true,
    })
  }

  handleManualVsMapInput() {
    this.setState({
      mapClicked: false,
    })
  }

  render() {
    const { weatherData, currentLng, currentLat, mapClicked } = this.state;
    console.log('weather', this.state.weatherData)
    return (
      <div className='app-container'>
        <div className='header-container'>
          <h1 className='header'>Cowie's Weather App</h1>
        </div>
        <div className='user-navigation-container'>
          <UserNavigation
            currentLng={currentLng}
            currentLat={currentLat}
            mapClicked={mapClicked}
            handleManualVsMapInput={this.handleManualVsMapInput}
            getWeatherData={this.getWeatherData}
          />
        </div>
        <div className='map-container'>
          <Map
            handleGetLngLat={this.handleGetLngLat}
          />
        </div>
        {
        // Conditional to only display weather when the user requests it and to avoid errors
        weatherData.length > 0 ?
        <div className='weather-container'>
          <Weather
            weatherData={weatherData}
          />
        </div>
        :
        <div>

        </div>
        }
      </div>
    )
  }
}

export default App