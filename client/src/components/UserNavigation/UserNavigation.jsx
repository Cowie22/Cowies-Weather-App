import React from 'react';
import { WiDaySunny, WiShowers, WiThunderstorm, WiCloudy, WiSnow, WiSprinkle, WiDayHaze, WiSleet } from 'weather-icons-react';

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
  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }
  render() {
    const { forecast, longitude, latitude } = this.state;
    const ClearIcon = <WiDaySunny size={34} color='#ffb300' />
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
          name="longitude"
          placeholder={'Insert Longitude'}
          value={longitude}
          onChange={this.handleChange}
          className='input-field'
        />
        <input
          type="text"
          name="latitude"
          placeholder={'Insert Latitude'}
          value={latitude}
          onChange={this.handleChange}
          className='input-field'
        />
        <button className='user-btn'>Click For Weather {ClearIcon}</button>
      </form>
    )
  }
}

export default UserNavigation