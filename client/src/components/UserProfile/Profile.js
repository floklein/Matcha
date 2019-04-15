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
    const bgColor = {background: `rgb(${r}, ${g}, ${b})`};

    return (
      <React.Fragment>
        <div className="profile__top">
          <div className="profile__top-img" style={bgStyle}/>
        </div>
        <div className="centered">
          <div className="profile__main">
            <div className="profile__side-panel" style={bgColor}>
              <div className="profile__sp-img" style={bgStyle}>
                <div className="profile__sp-gradient"
                     style={{background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgb(${r}, ${g}, ${b}))`}}/>
              </div>
            </div>
            <div className="profile__center-panel">
              <div className="profile__cp-title">
                <h4>BIO</h4>
              </div>
              <div className="profile__cp-content bio">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur at atque consectetur
                  cupiditate dolorem dolores ea esse ex in ipsam modi odio quae quisquam ratione reiciendis repellendus
                  sit, suscipit!</p>
              </div>
              <div className="profile__cp-title">
                <h4>INTÉRÊTS</h4>
              </div>
              <div className="profile__cp-content tags">
                <div style={bgColor}>cinema</div>
                <div style={bgColor}>musique</div>
                <div style={bgColor}>sortir</div>
                <div style={bgColor}>voyage</div>
                <div style={bgColor}>rihanna</div>
                <div style={bgColor}>brad_pitt</div>
                <div style={bgColor}>paris</div>
                <div style={bgColor}>paris</div>
                <div style={bgColor}>paris</div>
                <div style={bgColor}>paris</div>
                <div style={bgColor}>paris</div>
              </div>
              <div className="profile__cp-title">
                <h4>PHOTOS</h4>
              </div>
              <div className="profile__cp-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur at atque consectetur
                  cupiditate dolorem dolores ea esse ex in ipsam modi odio quae quisquam ratione reiciendis repellendus
                  sit, suscipit!</p>
              </div>
              <div className="profile__cp-title">
                <h4>POSITION</h4>
              </div>
              <div className="profile__cp-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur at atque consectetur
                  cupiditate dolorem dolores ea esse ex in ipsam modi odio quae quisquam ratione reiciendis repellendus
                  sit, suscipit!</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;