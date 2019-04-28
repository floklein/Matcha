import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow,  } from 'google-maps-react';

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
    markers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    city: ''
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

  getAddressPart = (address, Part) => {
    const findType = type => type.types[0] === Part;
    const location = address.map(obj => obj);
    const rr = location.filter(findType)[0];

    return (rr.long_name);
  };

  onMarkerClick = (props, marker, e) => {
    console.log(props);
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.position.lat},${props.position.lng}&key=(api_key)`)
      .then(res => {
        console.log(res.data.results[0].address_components);
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          city: this.getAddressPart(res.data.results[0].address_components, "locality") + ', ' + this.getAddressPart(res.data.results[0].address_components, "administrative_area_level_2")
        })
      });
  };


  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        onClick={this.onMapClick}
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
            onClick={this.onMarkerClick}
            name = {item.firstName + " " + item.lastName}
            profilePic = {item.profile_pic}
            key = {id}
            position = {{lat: item.latitude, lng: item.longitude}}
            icon = {{
              url: (item.gender === 'male' ? blueicon : item.gender === 'female' ? pinkicon : icon),
              scaledSize: new this.props.google.maps.Size(30, 30)
            }}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <img src={this.state.selectedPlace.profilePic} alt={'profile_picture'}></img>
          <h3>{this.state.selectedPlace.name}</h3>
          <h4>{this.state.city}</h4>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (api_key)
})(MapContainer);
