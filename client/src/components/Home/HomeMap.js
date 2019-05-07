import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow,} from 'google-maps-react';
import axios from 'axios/index';

import {GMapiKey} from '../../config/GMapiKey';

import pinkicon from '../../assets/img/pinklogo.svg';
import blueicon from '../../assets/img/bluelogo.svg';
import purpleicon from '../../assets/img/purplelogo.svg';

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
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  getAddressPart = (address, Part) => {
    const findType = type => type.types[0] === Part;
    const location = address.map(obj => obj);
    const rr = location.filter(findType)[0];

    return (rr.long_name);
  };

  onMarkerClick = (props, marker, e) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.position.lat},${props.position.lng}&key=${GMapiKey}`)
      .then(res => {
        let comp;
        const city = this.getAddressPart(res.data.results[0].address_components, "locality");
        if (city === 'Paris') {
          comp = this.getAddressPart(res.data.results[0].address_components, "postal_code").slice(-2);
          comp = (comp[0] === '0' ? comp.slice(-1) : comp);
          comp += (comp === "1" ? "er" : "ème");
          comp += " Arrondissement";
        }
        else {
          comp = this.getAddressPart(res.data.results[0].address_components, "administrative_area_level_2");
        }
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          city: city + ', ' + comp
        });
      })
      .catch(err => {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          city: ''
        });
      });
  };

  onMapClick = (props) => {
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
        initialCenter={{
          lat: 46.8534,
          lng: 2.3488
        }}>
        {this.state.markers.map((item, id) => (
          <Marker
            onClick={this.onMarkerClick}
            name={item.firstName + " " + item.lastName}
            profilePic={item.profile_pic}
            key={id}
            position={{lat: item.latitude, lng: item.longitude}}
            icon={{
              url: (item.gender === 'male' ? blueicon : item.gender === 'female' ? pinkicon : purpleicon),
              scaledSize: new this.props.google.maps.Size(30, 30)
            }}/>
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div className="info-window">
            <div className="iw__pic" style={{backgroundImage: `url("${this.state.selectedPlace.profilePic}")`}} alt="profile_picture"/>
            <h3>{this.state.selectedPlace.name}</h3>
            <p>{this.state.city}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({apiKey: GMapiKey})(MapContainer);