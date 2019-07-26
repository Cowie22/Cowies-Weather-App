import React from 'react';
import { WiDaySunny } from 'weather-icons-react';

class UserNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: `Today's Weather`,
      longitude: '',
      latitude: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  // Allows handle change to be used by all three input fields
  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }
  render() {
    const { forecast, longitude, latitude } = this.state;
    const { currentLng, currentLat, handleManualVsMapInput, mapClicked, getWeatherData } = this.props;
    const SunnyIcon = <WiDaySunny size={34} color='#ffb300' />
    const latInput = document.getElementById('lat');
    const lngInput = document.getElementById('lng');
    return (
      <form className='navigation-container'>
        <label className='dropdown-container'>
          <select name="forecast" value={forecast} onChange={this.handleChange} className='dropdown'>
            <option value="Today's Weather">Today's Weather</option>
            <option value="Five Day Forecast">Five Day Forecast</option>
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