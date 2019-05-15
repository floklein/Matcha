import React, {Component} from 'react';
import {connect} from 'react-redux';

import Message from './Message';

import './chatpanel.css';
import noMsgImg from '../../assets/img/chat-no-msg.svg';

class Messages extends Component {
  componentDidUpdate() {
    const msgDiv = document.querySelector('.chat__messages');
    msgDiv.scrollTop = msgDiv.scrollHeight;
  }

  render() {
    const {messages} = this.props;

    return (
      <div className="chat__messages">
        {messages && Array.isArray(messages)
        && messages.slice().reverse().map((message) => (
          <Message key={message.id} content={message.message} date={message.date} whose={message.whose}/>
        ))}
        <div className="chat__msg-no-messages">
          <img src={noMsgImg} alt="no message"/>
          <br/><br/>
          <span>Pas de messages.</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.chat.messages
});

export default connect(mapStateToProps)(Messages);