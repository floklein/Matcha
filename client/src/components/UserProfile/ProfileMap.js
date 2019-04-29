import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

import {GMapiKey} from '../../config/GMapiKey';

import pinkicon from '../../assets/img/pinklogo.svg';
import blueicon from '../../assets/img/bluelogo.svg';
import purpleicon from '../../assets/img/purplelogo.svg';

export class ProfileMap extends Component {
  state = {
    position: {},
    gender: {}
  };

  render() {
    return (
      <Map
        onClick={this.onMapClick}
        google={this.props.google}
        zoom={12}
        initialCenter={this.props.position}>
        <Marker
          onClick={this.onMarkerClick}
          position={this.props.position}
          icon={{
            url: (this.props.gender === 'male' ? blueicon : this.props.gender === 'female' ? pinkicon : purpleicon),
            scaledSize: new this.props.google.maps.Size(50, 50)
          }}/>
      </Map>
    );
  }
}

export default GoogleApiWrapper({apiKey: GMapiKey})(ProfileMap);