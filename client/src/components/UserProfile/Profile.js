import React, {Component} from 'react';
import Faker from 'faker';
import getAverageColor from 'get-average-color';

import './profile.css';
import './edit.css';

class Profile extends Component {
  state = {
    url: Faker.fake('{{image.avatar}}'),
    username: Faker.fake('{{internet.userName}}'),
    firstName: Faker.fake('{{name.firstName}}'),
    lastName: Faker.fake('{{name.lastName}}'),
    bio: Faker.fake('{{lorem.sentences}}')
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
    const photoUrl = this.state.url;
    const bgCss = `url("${photoUrl}") no-repeat center`;
    const bgPhoto = {background: bgCss, backgroundSize: 'cover'};
    const {r, g, b} = this.state;
    const bgColor = {backgroundColor: `rgb(${r}, ${g}, ${b})`};

    return (
      <React.Fragment>
        <div className="profile__top">
          <div className="profile__top-img" style={bgPhoto}/>
        </div>
        <div className="centered">
          <div className="profile__main">
            <div className="profile__side-panel" style={bgColor}>
              <div className="profile__sp-img" style={bgPhoto}>
                <div className="profile__sp-gradient"
                     style={{background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgb(${r}, ${g}, ${b}))`}}/>
              </div>
              <div className="profile__sp-content">
                <div>
                  <button>AIMER</button>
                </div>
                <div>
                  <h1>{`${this.state.firstName} ${this.state.lastName}`}</h1>
                </div>
                <div>
                  <p>{this.state.username}</p>
                </div>
                <div className="profile__sp-infos">
                  <div>
                    <div>GENRE</div>
                    <div>Homme</div>
                  </div>
                  <div>
                    <div>ÂGE</div>
                    <div>23</div>
                  </div>
                  <div>
                    <div>SEXUALITÉ</div>
                    <div>Hétéro</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile__right-panel">
              <div className="profile__middle-panel">
                <div>{this.state.firstName} vous aime déjà</div>
                <div className="connected">En ligne</div>
                {/*<div className="popularity p1" >Nouveau<div>- 42</div></div>*/}
                {/*<div className="popularity p2" >Connu<div>- 42</div></div>*/}
                {/*<div className="popularity p3" >Populaire<div>- 42</div></div>*/}
                <div className="popularity p4" >Célèbre<div>- 42</div></div>
              </div>
              <div className="profile__center-panel">
                <div className="profile__cp-title">
                  <h4>BIO</h4>
                </div>
                <div className="profile__cp-content bio">
                  <p>{this.state.bio}</p>
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
                  <div style={bgColor}>new_york</div>
                  <div style={bgColor}>fashion</div>
                  <div style={bgColor}>party</div>
                  <div style={bgColor}>books</div>
                </div>
                <div className="profile__cp-title">
                  <h4>PHOTOS</h4>
                </div>
                <div className="profile__cp-content photos">
                  <div style={bgPhoto}/>
                  <div style={bgPhoto}/>
                  <div style={bgPhoto}/>
                  <div style={bgPhoto}/>
                  <div className="no-photo" style={bgColor} title="Cet utilisateur n'a pas publié de photos."/>
                  <div className="add-photo" style={bgColor}/>
                </div>
                <div className="profile__cp-title">
                  <h4>POSITION</h4>
                </div>
                <div className="profile__cp-content map">
                  <iframe title="map" width="150%" height="200%" frameBorder="0"
                          src="https://www.google.com/maps/d/embed?mid=1-57radknCCRjqVekxyooWmvh-jQdV0_w&z=6&ll=47.048454, 3.105408"/>
                </div>
                <div className="profile__cp-buttons">
                  <button className="report" title="Signaler cet utilisateur"/>
                  <button className="block" title="Bloquer cet utilisateur"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;