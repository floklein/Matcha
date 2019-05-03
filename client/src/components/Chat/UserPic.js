import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import classnames from 'classnames';

import {getMessages, setCurrent} from "../../store/actions/chatActions";

import './chatpanel.css';

class UserPic extends Component {
  state = {
    firstName: '...',
    profile_pic: ''
  };

  componentDidMount() {
    axios.get(`/api/profile/${this.props.userId}`)
      .then(res => {
        this.setState({
          ...res.data
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  onGetMessages = () => {
    this.props.getMessages(this.props.userId);
    this.props.setCurrent(this.props.userId);
  };

  render() {
    const {firstName, profile_pic} = this.state;
    const {notif, current} = this.props;

    return (
      <div className={classnames('chat__user-div', {
        'notif': notif,
        'current': current
      })} onClick={this.onGetMessages}>
        <div className="chat__user-pic" style={{backgroundImage: `url("${profile_pic}")`}}/>
        <div className="chat__user-overlay">{firstName}</div>
      </div>
    );
  }
}

export default connect(null, {getMessages, setCurrent})(UserPic);