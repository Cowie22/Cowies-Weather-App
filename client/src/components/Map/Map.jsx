import React from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className='inner-map-container'>
      <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBSBuWAjIYxYIqLRmVYltprhS0_mwUO7k8' }}
          className={'map'}
          defaultCenter={{lat: 40.7128, lng: -74.0060}}
          defaultZoom={0}
          style={{
            color: 'white',
            height: 500,
            width: 1000,
            position: 'fixed',
            zIndex: -10,
            top: '24%',
        }}
          yesIWantToUseGoogleMapApiInternals
        >
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map