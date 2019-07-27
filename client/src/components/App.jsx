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
    // Typically this first call would be made in component did mount, however for the purposes
    // Of this app is is called when the user requests weather data.
    // The second function is responsible for adding the most recently searched city to the database
    // Thus allowing the user to select this most recent value, along with nine other most recent values from the dropdown.
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
      })
      // If an invalid lat.lng is inputted than the user will be alerted
      .catch(err => {
        alert('PLEASE INSERT PROPER LATITUDE AND LONGITUDE')
      });
  }

  // Simply grabs the 10 most recent cities and sets them in state
  getCity() {
    axios.get(`/city`)
      .then(res => {
        this.setState({
          cities: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  // Posts a new city to the database
  addCity(info) {
    axios.post(`/city`, info)
      .then(this.getCity())
      .catch(err => {
        console.log(err)
      });
  }

  // When a user clicks the map, they will get the lat/lng, which will be displayed in the input fields.
  // In combination with the function below, it allows the input fields to have values given
  // From the map as well as manual input.  Hence, the mapClicked state.
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
    const { weatherData, currentLng, currentLat, mapClicked, cities } = this.state;
    return (
      <div className='app-container'>
        <div className='header-container'>
          <h1 className='header'>Ryan Cowie's Weather App</h1>
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
          // Conditional to only display weather when the user requests it and to avoid errors do to undefined values
          // Do to the fact that they have not been retrieved from the API yet.
          weatherData.consolidated_weather ?
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
      </div>
    )
  }
}

export default App