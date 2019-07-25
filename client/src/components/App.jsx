import React from 'react';
import './Styles/Styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className='app-container'>
        <div className='header-container'>
          <h1 className='header'>Cowie's Weather App</h1>
        </div>
        <div className='user-navigation-container'>

        </div>
      </div>
    )
  }
}

export default App