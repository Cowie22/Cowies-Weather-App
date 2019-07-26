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
    };
    this.handleGetLngLat = this.handleGetLngLat.bind(this);
  }
  componentDidMount() {
    this.getWeatherData();
  }

  getWeatherData(lat, long) {
    // Remember to authenticate the number, maybe include an example
    // Maybe do a google map this would be cool...
    // When you click on a google map you can probably pick up the long and lat
    // Then user can press enter to get the data
    // Do it... this will get you a job
    // Just Do It.
    // google.maps.event.addListener(map, 'click', function( event ){
    // alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() );
    // });
    // Make it work on google map click and user input

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
      currentLng: event.lat,
      currentLat: event.lng,
    })
  }

  render() {
    return (
      <div className='app-container'>
        <div className='header-container'>
          <h1 className='header'>Cowie's Weather App</h1>
        </div>
        <div className='user-navigation-container'>
          <UserNavigation
          
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