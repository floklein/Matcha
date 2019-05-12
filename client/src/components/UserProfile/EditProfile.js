import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import ReactTags from 'react-tag-autocomplete';

import {fetchProfile} from '../../store/actions/profileActions';
import {uploadImage, changeInfos} from '../../store/actions/userActions';

import Loading from '../Loading';
import ContentEditable from './ContentEditable'

import './profile.css';
import './edit.css';

class EditProfile extends Component {
  state = {
    suggestions: []
  };

  componentWillMount() {
    axios.get('/api/interests/getAll')
      .then(res => {
        this.setState({
          suggestions: res.data
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    document.title = 'Éditer mon profil';
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

  componentDidUpdate() {
    if (this.state.rgb) {
      const {r, g, b} = this.state.rgb;
      document.querySelectorAll('.profile__cp-content.my.tags button').forEach(tag => {
        tag.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      });
    }
  }

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
    if (position < 20) {
      axios.delete(`/api/picture/${e.target.id}`)
        .then(() => {
          this.props.fetchProfile(this.props.me.id);
        })
        .catch(err => {});
    } else if (position > 70) {
      axios.post(`/api/picture/profile_pic/${e.target.id}`)
        .then(() => {
          console.log('uodate');
          this.props.fetchProfile(this.props.me.id);
        })
        .catch(err => {});
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
    if (e.target.files[0]) {
      this.props.uploadImage(e.target.files[0]);
    }
  };

  handleDelete(i) {
    const interests = this.state.interests.slice(0);
    interests.splice(i, 1);
    this.setState({interests});
  }

  handleAdd(interest) {
    const interests = [].concat(this.state.interests, interest);
    this.setState({interests});
  }

  submitChanges = () => {
    const newLat = parseFloat(document.getElementById('gm-lat').value);
    const newLng = parseFloat(document.getElementById('gm-lng').value);
    if (newLat === 0 || newLng === 0) {
      this.props.changeInfos(this.state);
    } else {
      this.props.changeInfos({
        ...this.state,
        latitude: newLat,
        longitude: newLng
      });
    }
  };

  render() {
    if (!this.props.profile)
      return (<Loading/>);
    const {profile} = this.props;
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
                             defaultValue={profile.age} max="99" min="18" placeholder="?"
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
                <div className="profile__cp-content my tags">
                  <ReactTags tags={this.state.interests} suggestions={this.state.suggestions}
                             minQueryLength={1}
                             handleDelete={this.handleDelete.bind(this)}
                             handleAddition={this.handleAdd.bind(this)}
                             placeholder="ex: Paris, lecture, Kubrick..."
                             autofocus={false}
                             allowNew={true}/>
                </div>
                <div className="profile__cp-title">
                  <h4>PHOTOS</h4>
                </div>
                <div className="profile__cp-content my photos">
                  {profile.photos.map((photo, i) => (
                    <div key={i} style={{backgroundImage: `url('${photo.url}')`}} onClick={this.photoAction} id={photo.n}/>
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
                  <input id="gm-input" type="text" placeholder="ex: Lyon, 11 rue Féraud"/>
                  <input hidden id="gm-lat" type="text"/>
                  <input hidden id="gm-lng" type="text"/>
                  <div id="gm-map"/>
                  <div className="no-map">Please refresh</div>
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