import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchProfile} from "../../store/actions/profileActions";

import Loading from '../Loading';
import ProfileMap from "./ProfileMap";

import './profile.css';
import './edit.css';
import {NavLink} from "react-router-dom";

class MyProfile extends Component {
  componentDidMount() {
    this.props.fetchProfile(this.props.me.id);
  }

  getGender = (gender) => {
    switch (gender) {
      case 'male':
        return 'Homme';
      case 'female':
        return 'Femme';
      default:
        return 'Non binaire';
    }
  };

  getSexuality = (sexuality) => {
    switch (sexuality) {
      case 'heterosexual':
        return 'Hétéro';
      case 'homosexual':
        return 'Homo';
      default:
        return 'Bi';
    }
  };

  getPopularity = (popularity) => {
    switch (popularity.rank) {
      case 1:
        return (<div className="popularity p1">Nouveau
          <div>- {popularity.score}</div>
        </div>);
      case 2:
        return (<div className="popularity p2">Connu
          <div>- {popularity.score}</div>
        </div>);
      case 3:
        return (<div className="popularity p3">Populaire
          <div>- {popularity.score}</div>
        </div>);
      case 4:
        return (<div className="popularity p4">Célèbre
          <div>- {popularity.score}</div>
        </div>);
      default:
        return (<div className="popularity p1">Nouveau
          <div>- {popularity.score}</div>
        </div>);
    }
  };

  photoAction = (e) => {
    const position = e.clientY - e.target.offsetTop + window.scrollY;
    console.log(position);
    if (position < 20) {
      console.log('delete');
    } else if (position > 75) {
      console.log('profile');
    }
  };

  render() {
    if (!this.props.profile)
      return (<Loading/>);
    const profile = this.props.profile;
    const gender = this.getGender(profile.gender);
    const sexuality = this.getSexuality(profile.sexuality);
    const popularity = this.getPopularity(profile.popularity);
    const {r, g, b} = profile.rgb;
    const bgPhoto = {backgroundImage: `url('${profile.profile_pic}')`};
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
                  <NavLink to="/account/profile/edit"><button>MODIFIER</button></NavLink>
                </div>
                <div>
                  <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
                </div>
                <div>
                  <p>{profile.username}</p>
                </div>
                <div className="profile__sp-infos">
                  <div>
                    <div>GENRE</div>
                    <div>{gender}</div>
                  </div>
                  <div>
                    <div>ÂGE</div>
                    <div>{profile.age ? profile.age : '?'}</div>
                  </div>
                  <div>
                    <div>SEXUALITÉ</div>
                    <div>{sexuality}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile__right-panel">
              <div className="profile__middle-panel">
                <div className="connected">En ligne</div>
                {popularity}
              </div>
              <div className="profile__center-panel">
                <div className="profile__cp-title">
                  <h4>BIO</h4>
                </div>
                <div className="profile__cp-content bio">
                  <p>{profile.bio ? profile.bio : `${profile.firstName} n'a pas écrit de bio.`}</p>
                </div>
                <div className="profile__cp-title">
                  <h4>INTÉRÊTS</h4>
                </div>
                <div className="profile__cp-content tags">
                  {profile.interests.map((interest, i) => (
                    <div key={i} style={bgColor}>{interest.tag}</div>
                  ))}
                </div>
                <div className="profile__cp-title">
                  <h4>PHOTOS</h4>
                </div>
                <div className="profile__cp-content my photos">
                  {profile.photos.map((photo, i) => (
                    <div key={i} style={{backgroundImage: `url('${photo}')`}} onClick={this.photoAction}/>
                  ))}
                  {!profile.photos.length && <div className="no-photo" style={bgColor} title="Cet utilisateur n'a pas publié de photos."/>}
                  <div className="add-photo" style={bgColor}/>
                </div>
                <div className="profile__cp-title">
                  <h4>POSITION</h4>
                </div>
                <div className="profile__cp-content map">
                  <ProfileMap
                    position={{lat: profile.latitude, lng: profile.longitude}}
                    gender={profile.gender}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

MyProfile.propTypes = {
  fetchProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  error: state.errors.profile,
  me: state.auth.user
});

export default connect(mapStateToProps, {fetchProfile})(MyProfile);