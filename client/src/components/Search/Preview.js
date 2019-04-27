import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import getAverageColor from 'get-average-color';

import {likeUser} from "../../store/actions/profileActions";

import './preview.css';

class Preview extends Component {
  state = {
    id: '',
    username: '...',
    firstName: '...',
    lastName: '...',
    age: '...',
    gender: '...',
    sexuality: '...',
    profile_pic: '',
    rgb: {},
    position: this.props.position,
    like: 'no'
  };

  componentDidMount() {
    axios.get(`/api/profile/${this.props.userId}`)
      .then(res => {
        getAverageColor(res.data.profile_pic)
          .then(rgb => {
            this.setState({
              ...res.data,
              rgb: rgb,
              distance: (Math.round(this.props.distance / 100) / 10 + ' km').replace('.', ',')
            });
          })
          .catch((err) => {
            console.log('GAC error: ' + err);
          });
      })
      .catch(err => {
        console.log('Axios error: ' + err);
      });
  }

  componentWillReceiveProps(nextProps) {
    axios.get(`/api/profile/${nextProps.userId}`)
      .then(res => {
        getAverageColor(res.data.profile_pic)
          .then(rgb => {
            this.setState({
              ...res.data,
              rgb: rgb,
              distance: (Math.round(nextProps.distance / 100) / 10 + ' km').replace('.', ',')
            });
          })
          .catch((err) => {
            console.log('GAC error: ' + err);
          });
      })
      .catch(err => {
        console.log('Axios error: ' + err);
      });
  }

  getGender = (gender) => {
    switch (gender) {
      case 'male':
        return 'Homme';
      case 'female':
        return 'Femme';
      case 'other':
        return 'Non binaire';
      default:
        return '...';
    }
  };

  getSexuality = (sexuality) => {
    switch (sexuality) {
      case 'heterosexual':
        return 'Hétéro';
      case 'homosexual':
        return 'Homo';
      case 'bisexual':
        return 'Bi';
      default:
        return '...';
    }
  };

  onLikeUser = () => {
    this.props.likeUser(this.state.id);
    this.setState({
      like: this.state.like === 'both' || this.state.like === 'me' ? 'no' : 'me'
    });
  };

  render() {
    const {profile_pic, firstName, lastName, username, gender, age, sexuality, position, like} = this.state;
    const {r, g, b} = this.state.rgb;
    const genre = this.getGender(gender);
    const sexualite = this.getSexuality(sexuality);
    const bg = {backgroundColor: `rgb(${r}, ${g}, ${b})`};

    return (
      <div className="preview" style={bg}>
        <div className="preview__profile-pic" style={{backgroundImage: `url("${profile_pic}")`}}/>
        <div className="preview__name">{firstName + ' ' + lastName}</div>
        <div className="preview__username">{username}</div>
        <div className="preview__infos">
          <div>
            <div>ÂGE</div>
            <div>{age}</div>
          </div>
          <div>
            <div>VILLE</div>
            <div>{position}</div>
          </div>
          <div>
            <div>GENRE</div>
            <div>{genre}</div>
          </div>
          <div>
            <div>SEXUALITÉ</div>
            <div>{sexualite}</div>
          </div>
        </div>
        <button className={classnames('preview__button pink',{
          'dislike': like === 'me' || like === 'both'
        })} onClick={this.onLikeUser}/>
      </div>
    );
  }
}

export default connect(null, {likeUser})(Preview);