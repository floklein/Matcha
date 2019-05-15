import React, {Component} from 'react';
import {connect} from 'react-redux';

import Notification from './Notification';

import './notifications.css';

class Notifications extends Component {
  state = {
    notifs: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.newNotif && nextProps.newNotif !== this.props.newNotif) {
      this.setState({
        notifs: this.state.notifs.concat([nextProps.newNotif])
      });
    }
  }

  removeNotif = (id) => {
    this.setState({
      notifs: this.state.notifs.filter(notif => notif.id !== id)
    })
  };

  render() {
    const {notifs} = this.state;

    return (
      <div className="notifications-popups">
        {notifs && Array.isArray(notifs) && notifs.map((notif) => (
          <Notification key={notif.id} notif={notif} killMe={this.removeNotif}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newNotif: state.notifications.newNotif
});

export default connect(mapStateToProps)(Notifications);