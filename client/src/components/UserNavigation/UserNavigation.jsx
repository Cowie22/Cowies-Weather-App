import React from 'react';
import { WiDaySunny } from 'weather-icons-react';

class UserNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: `Recently Searched`,
      longitude: '',
      latitude: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRecentCityClick = this.handleRecentCityClick.bind(this);
  }
  // Allows handle change to be used by all three input fields
  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleRecentCityClick(event) {
    let cityValues = (event.target.value).split(',')
    let currentLat = cityValues[1];
    let currentLng = cityValues[2];
    this.setState({
      city: event.target.value,
      latitude: currentLat,
      longitude: currentLng,
    })
  }
  render() {
    const { city, longitude, latitude } = this.state;
    const { currentLng, currentLat, handleManualVsMapInput, mapClicked, getWeatherData, cities } = this.props;
    const SunnyIcon = <WiDaySunny size={34} color='#ffb300' />
    const latInput = document.getElementById('lat');
    const lngInput = document.getElementById('lng');
    let dropdownOptions = cities.map((city, i) => {
      let valueArray = [city.name, city.latitude, city.longitude];
      return (
        <option
          value={valueArray}
          name={city.name}
          key={i}
          lat={city.latitude}
          lng={city.longitude}
          >
          {city.name}
        </option>
      )
    })
    return (
      <form className='navigation-container'>
        <label className='dropdown-container'>
          <select
            name="city"
            value={city}
            onChange={this.handleRecentCityClick}
            default='Recently Searched'
            className='dropdown'
            onClick={() => handleManualVsMapInput()}
          >
            <option value={'Recently Searched'} key={0}>Recently Searched</option>
            {dropdownOptions}
          </select>
        </label>
        <input
          type="text"
          name="latitude"
          placeholder={'Insert Latitude'}
          // Conditional that allows the user to either click the map for longitude or manually enter it
          value={ mapClicked ? currentLat : latitude }
          onChange={this.handleChange}
          // Determines whether the user is clicking the map or manually entering longitude and latitude
          // Thus allowing both to occur on the same input fields
          onClick={() => handleManualVsMapInput()}
          className='input-field'
          id='lat'
        />
        <input
          type="text"
          name="longitude"
          placeholder={'Insert Longitude'}
          value={ mapClicked ? currentLng : longitude }
          onChange={this.handleChange}
          onClick={() => handleManualVsMapInput()}
          className='input-field'
          id='lng'
        />
        <button
          className='user-btn'
          onClick={(event) => {
              event.preventDefault();
              getWeatherData(latInput.value, lngInput.value);
            }
          }
        >
        Click For Weather {SunnyIcon}
        </button>
      </form>
    )
  }
}

export default UserNavigation