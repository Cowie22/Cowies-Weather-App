import React from 'react';
import './Styles/Styles.scss';
import axios from 'axios';
import UserNavigation from './UserNavigation/UserNavigation.jsx';
import Map from './Map/Map.jsx';

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
  }
  componentDidMount() {
    this.getWeatherData();
  }

  getWeatherData(lat, long) {
    // Remember to authenticate the number, maybe include an example

    // AIzaSyDWko97eVmFE7qTqFihsNitf-upOZeSks4

    axios.get(`/weather/${lat}/${long}`)
      .then(res => {
        console.log(res)
        this.setState({
          weatherData: res.data,
        })
      })
  }

  handleGetLngLat(event) {
    this.setState({
      currentLng: event.lat.toFixed(4),
      currentLat: event.lng.toFixed(4),
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
          />
        </div>
        <div className='map-container'>
          <Map
            handleGetLngLat={this.handleGetLngLat}
          />
        </div>
      </div>
    )
  }
}

export default App