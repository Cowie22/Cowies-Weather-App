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
      cities: [],
      currentCity: '',
      currentLng: 0,
      currentLat: 0,
      mapClicked: false,
    };
    this.handleGetLngLat = this.handleGetLngLat.bind(this);
    this.handleManualVsMapInput = this.handleManualVsMapInput.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
    this.addCity = this.addCity.bind(this);
  }

  componentDidMount() {
    this.getCity();
  }

  getWeatherData(lat, lng) {
    // Typically this call would be made in component did mount, however for the purposes
    // Of this app is is called when the user requests weather data
    axios.get(`/weather/${lat}/${lng}`)
      .then(res => {
        this.setState({
          weatherData: res.data,
          currentCity: res.data.title,
        })
      })
      .then(() => {
        let info = {
          postLat: lat,
          postLng: lng,
          postCity: this.state.currentCity,
        };
        this.addCity(info);
      });
  }

  getCity() {
    axios.get(`/city`)
      .then(res => {
        this.setState({
          cities: res.data,
        });
      });
  }

  addCity(info) {
    console.log('postinfo', info)
    axios.post(`/city`, info)
      .then(this.getCity());
  }

  // When a user clicks the map, they will get the lng/lat and will be the input fields will display the results
  // In combination with the function below, it allows the input fields to have values from different states,
  // Either from the map, or manual user input.  Hence the use mapClicked state
  handleGetLngLat(event) {
    this.setState({
      currentLng: event.lng.toFixed(4),
      currentLat: event.lat.toFixed(4),
      mapClicked: true,
    });
  }

  handleManualVsMapInput() {
    this.setState({
      mapClicked: false,
    });
  }

  render() {
    const { weatherData, currentLng, currentLat, mapClicked, cities, currentCity } = this.state;
    console.log('weather', weatherData)
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
            cities={cities}
            handleManualVsMapInput={this.handleManualVsMapInput}
            getWeatherData={this.getWeatherData}
          />
        </div>
        <div className='lower-app-container'>
          <div className='map-container'>
            <Map
              handleGetLngLat={this.handleGetLngLat}
            />
          </div>
          {
          // Conditional to only display weather when the user requests it and to avoid errors
          weatherData.consolidated_weather ?
          <div className='weather-container'>
            <Weather
              weatherData={weatherData}
            />
          </div>
          :
          <div className='weather-container'>
            {/* <h1>Or Click Map</h1> */}
          </div>
          }
        </div>
      </div>
    )
  }
}

export default App