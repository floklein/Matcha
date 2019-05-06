import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {fetchProfile} from "../../store/actions/profileActions";
import {uploadImage, changeInfos} from "../../store/actions/userActions";

import Loading from '../Loading';
import ProfileMap from './ProfileMap';
import ContentEditable from './ContentEditable'

import './profile.css';
import './edit.css';
import {NavLink} from "react-router-dom";

class EditProfile extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchProfile(this.props.me.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.setState({
        ...nextProps.profile
      });
    }
    if (nextProps.submitOutcome !== this.props.submitOutcome) {
      if (nextProps.submitOutcome === true) {
        window.location.href = '/account/profile';
      }
    }
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFirstName = (e) => {
    this.setState({
      firstName: e.target.value
    });
  };

  handleLastName = (e) => {
    this.setState({
      lastName: e.target.value
    });
  };

  handleBio = (e) => {
    this.setState({
      bio: e.target.value
    });
  };

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  handleNewPhoto = (e) => {
    //TODO: Image validation
    if (e.target.files[0]) {
      this.props.uploadImage(e.target.files[0]);
    }
  };

  submitChanges = () => {
    this.props.changeInfos(this.state);
  }

  render() {
    if (!this.props.profile)
      return (<Loading/>);
    const profile = this.props.profile;
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
                  <button onClick={this.submitChanges}>TERMINÉ</button>
                </div>
                <div>
                  <h1>
                    <ContentEditable html={profile.firstName}
                                     onChange={this.handleFirstName}>{profile.firstName}</ContentEditable>
                    &nbsp;
                    <ContentEditable html={profile.lastName}
                                     onChange={this.handleLastName}>{profile.lastName}</ContentEditable>
                  </h1>
                </div>
                <div>
                  <p><ContentEditable html={profile.username}
                                      onChange={this.handleUsername}>{profile.username}</ContentEditable>&nbsp;</p>
                </div>
                <div className="profile__sp-infos">
                  <div>
                    <div>GENRE</div>
                    <div className="select-wrapper">
                      <select className="editable" defaultValue={profile.gender} name="gender"
                              onChange={this.handleChange}>
                        <option disabled>Votre genre...</option>
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                        <option value="other">Non binaire</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div>ÂGE</div>
                    <div className="select-wrapper age">
                      <input type="number" className="editable age-input" name="age"
                             defaultValue={profile.age} max="99" min="18" placeholder="âge"
                             onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div>
                    <div>SEXUALITÉ</div>
                    <div className="select-wrapper">
                      <select className="editable" defaultValue={profile.sexuality} name="sexuality"
                              onChange={this.handleChange}>
                        <option disabled>Votre sexualité...</option>
                        <option value="heterosexual">Hétéro</option>
                        <option value="homosexual">Homo</option>
                        <option value="bisexual">Bi</option>
                      </select>
                    </div>
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
                  <p><ContentEditable html={profile.bio}
                                      onChange={this.handleBio}>{profile.bio ? profile.bio : `${profile.firstName} n'a pas écrit de bio.`}</ContentEditable>&nbsp;
                  </p>
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
                  {!profile.photos.length &&
                  <div className="no-photo" style={bgColor} title="Cet utilisateur n'a pas publié de photos."/>}
                  <input ref={fileInput => this.fileInput = fileInput} type="file" hidden
                         onChange={this.handleNewPhoto}/>
                  <div className={classnames('add-photo', {
                    'loading': this.props.loading
                  })} style={bgColor} onClick={() => this.fileInput.click()}/>
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

EditProfile.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  changeInfos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  error: state.errors.profile,
  me: state.auth.user,
  loading: state.user.loading,
  submitOutcome: state.user.outcome
});

export default connect(mapStateToProps, {fetchProfile, uploadImage, changeInfos})(EditProfile);