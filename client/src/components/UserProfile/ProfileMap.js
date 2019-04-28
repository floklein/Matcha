import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import pinkicon from '../../assets/img/pinklogo.svg';
import blueicon from '../../assets/img/bluelogo.svg';
import icon from '../../assets/img/logo.svg';

const mapStyles = {
  width: '30%',
  height: '30%'
};

export class ProfileMap extends Component {
  state = {
    position: {},
    gender: {}
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Map
        onClick={this.onMapClick}
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={this.props.position}
      >
        <Marker
          onClick={this.onMarkerClick}
          position = {this.props.position}
          icon = {{
            url: (this.props.gender === 'male' ? blueicon : this.props.gender === 'female' ? pinkicon : icon),
            scaledSize: new this.props.google.maps.Size(50, 50)
          }}
        />
      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: (api_key)
})(ProfileMap);
