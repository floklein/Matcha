
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import pinkicon from '../assets/img/pinklogo.svg';
import blueicon from '../assets/img/bluelogo.svg';
import icon from '../assets/img/logo.svg';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state = {
    markers: []
  };

  componentDidMount() {
    axios.get('/api/locations/topFifty')
      .then((res) => {
        this.setState({
          markers: res.data,
        });
        console.log(this.state.markers);
      });
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{
          lat: 46.8534,
          lng: 2.3488
        }}
        >
        {this.state.markers.map((item, id) => (
          <Marker
            key = {id}
            position = {{lat: item.latitude, lng: item.longitude}}
            icon = {{
              url: (item.gender === 'male' ? blueicon : item.gender === 'female' ? pinkicon : icon),
              scaledSize: new this.props.google.maps.Size(30, 30)
            }}
          />
        ))}
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAnZ3_8Fja2W5-4B51igOhW0TJiYMELIjg'
})(MapContainer);
