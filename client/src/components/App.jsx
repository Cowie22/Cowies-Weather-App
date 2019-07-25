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
      <div className="app-container">
        <h1 className="header">COWIE'S WEATHER APP</h1>
      </div>
    )
  }
}

export default App