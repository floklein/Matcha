import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserPic from './UserPic';
import Messages from './Messages';

import {getMatches, getMessages, sendMessage} from "../../store/actions/chatActions";

import './chatpanel.css';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

class ChatPanel extends Component {
  state = {
    shown: false,
    message: '',
    socket: socket,
    received: false
  };

  componentWillMount() {
    this.props.getMatches();
  }

  componentDidMount() {
  }

  toggleChat = () => {
    const {shown} = this.state;

    this.setState({
      shown: !shown
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props.matches);
    if (this.props.matches) {
      for (let i = 0; i < this.props.matches.length; i++) {
        socket.emit('room', `r${Math.max(this.props.matches[i].me, this.props.matches[i].id)}-${Math.min(this.props.matches[i].me, this.props.matches[i].id)}`);
      }
    }
    socket.on('new message', () => {
      this.props.getMessages(this.props.current);
      this.setState({
        received: true
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSendMessage = (e) => {
    e.preventDefault();
    if (this.props.current && this.state.message !== '') {
      this.props.sendMessage(this.props.current, this.state.message);
      this.setState({
        message: ''
      });
      if (this.props.matches && this.props.matches[0])
        this.state.socket.emit('send message', "r" + (this.props.matches[0].me > this.props.current ? (this.props.matches[0].me + "-" + this.props.current) : this.props.current + "-" + this.props.matches[0].me));
      const msgDiv = document.querySelector('.chat__messages');
      setTimeout(() => {
        msgDiv.scrollTop = msgDiv.scrollHeight;
      }, 100);
    }
  };

  render() {
    console.log('render');
    const {matches} = this.props;
    const styleChat = {height: this.state.shown ? '21rem' : '0'};

    return (
      <React.Fragment>
        <div id="chatpanel">
          <div className="chat__title-bar" onClick={this.toggleChat}>
            <div className="chat__title-text">
              Discussion instantanée
            </div>
            <div className="chat__title-notifs">
              <div className="chat__notifs-div">
                <p>10</p>
              </div>
            </div>
          </div>
          <div className="chat__interface" style={styleChat}>
            <div className="chat__users-bar">
              {matches && Array.isArray(matches)
              && matches.map((match) => (
                <UserPic key={match.id} userId={match.id} notif={false} current={match.id === this.props.current}/>
              ))}
              <div className="chat__ub-no-users">
                Vous n'avez pas encore matché...
              </div>
            </div>
            <Messages/>
            <form onSubmit={this.onSendMessage}>
              <div className="chat__input-bar">
                <div className="chat__input">
                  <input type="text" name="message" placeholder="Écrivez votre message..."
                         onChange={this.handleChange} value={this.state.message}/>
                </div>
                <div className="chat__submit">
                  <button type="submit" className="chat__button"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  matches: state.chat.matches,
  messages: state.chat.messages,
  message: state.chat.message,
  current: state.chat.current
});

export default connect(mapStateToProps, {getMatches, getMessages, sendMessage})(ChatPanel);