import React from 'react';

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
    return (
      <form className='navigation-container'>
        <label className='dropdown-container'>
          Choose Forecast:
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
          style={{background: 'transparent', borderBottom: '2px solid rgba(255,255,255,0.2)'}}
        />
        <input
          type="text"
          name="latitude"
          placeholder={'Insert Latitude'}
          value={latitude}
          onChange={this.handleChange}
          style={{background: 'transparent', borderBottom: '2px solid rgba(255,255,255,0.2)'}}
          className='input-field'
        />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default UserNavigation