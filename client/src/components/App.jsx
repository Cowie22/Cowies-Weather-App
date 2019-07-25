import React from 'react';
import './Styles/Styles.scss';
import axios from 'axios';
import UserNavigation from './UserNavigation/UserNavigation.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
    };
  }
  componentDidMount() {
    this.getWeatherData();
  }
  getWeatherData() {
    axios.get(`/weather`)
      .then(res => {
        console.log(res)
        this.setState({
          weatherData: res.data,
        })
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
      </div>
    )
  }
}

export default App