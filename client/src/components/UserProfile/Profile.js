import React, {Component} from 'react';
import Faker from 'faker';
import getAverageColor from 'get-average-color';

import './profile.css';

class Profile extends Component {
  state = {
    url: Faker.fake('{{image.avatar}}')
  };

  componentDidMount() {
    getAverageColor(this.state.url)
      .then(rgb =>
        this.setState({
          url: this.state.url,
          r: rgb.r,
          g: rgb.g,
          b: rgb.b
        })
      )
      .catch(err => {
        console.log('LOADING ERROR: ' + err)
      });
  }

  render() {
    const imgUrl = this.state.url;
    const bgImg = `url("${imgUrl}") no-repeat center`;
    const bgStyle = {background: bgImg, backgroundSize: 'cover'};
    const {r, g, b} = this.state;

    return (
      <React.Fragment>
        <div className="profile__top">
          <div className="profile__top-img" style={bgStyle}/>
        </div>
        <div className="centered">
          <div className="profile__main">
            <div className="profile__side-panel" style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}>
              <div className="profile__sp-img" style={bgStyle}/>
            </div>
            <div className="profile__center-panel">

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;