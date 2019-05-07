import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from "classnames";
import {NavLink} from 'react-router-dom';

import {getNotifs} from '../../store/actions/notificationActions';

import noNotif from '../../assets/img/notif-none.svg';
import io from "socket.io-client";
const socket = io('http://localhost:5000');

class Notifications extends Component {
  state = {
    list: [],
    filter: 'all'
  };

  componentDidMount() {
    this.props.getNotifs();
  }

  componentWillReceiveProps(nextProps) {
    socket.on('new notif', () => {
      this.props.getNotifs();
    });
    if (nextProps.list && nextProps.list !== this.props.list && Array.isArray(nextProps.list)) {
      socket.emit('room', `r${nextProps.list[0].user_id}`);
      this.setState({
        list: nextProps.list
      });
    }
    if (nextProps.filterBy && nextProps.filterBy !== this.props.filterBy) {
      this.setState({
        filter: nextProps.filterBy
      });
    }
  }

  getTitle = (type) => {
    switch (type) {
      case 'visit':
        return 'Admirateur ou admiratrice ?';
      case 'like':
        return 'Super nouvelle !';
      case 'unlike':
        return 'Ça nous brise le cœur...';
      case 'match':
        return 'C\'est un match !';
      default:
        return 'Bonjour !';
    }
  };

  filterBy = (arr) => {
    if (this.state.filter === 'all') {
      return (arr);
    } else {
      return (arr.filter(elem => elem.type === this.state.filter));
    }
  };

  render() {
    const {list} = this.state;

    return (
      <div className="items">
        <div className="item no-notif">
          <img src={noNotif} alt="no notifs"/>
          <span>Pas de notifications.</span>
        </div>
        {list && this.filterBy(list).map((notif) => (
          <NavLink key={notif.id} className={classnames('item', {
            'new': !notif.read
          })} to={`/profile/${notif.notifier_name}`}>
            <div className="item__img"/>
            <div className="item__txt">
              <h4>{this.getTitle(notif.type)}</h4>
              <p>{notif.content}</p>
            </div>
          </NavLink>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.notifications.list
});

export default connect(mapStateToProps, {getNotifs})(Notifications);