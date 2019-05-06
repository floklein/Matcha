import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from "classnames";

import {getNotifs} from '../../store/actions/notificationActions';
import {getMatches, getMessages, sendMessage} from "../../store/actions/chatActions";

class Notifications extends Component {
  state = {
    list: []
  };

  componentDidMount() {
    this.props.getNotifs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list && nextProps.list !== this.props.list && Array.isArray(nextProps.list)) {
      this.setState({
        list: nextProps.list
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
        return 'Ça nous brise le coœur...';
      case 'match':
        return 'C\'est un match !';
      default:
        return 'Bonjour !';
    }
  };

  render() {
    const {list} = this.state;

    return (
      <div className="items">
        {list && list.map((notif) => (
          <div className={classnames('item', {
            'new': !notif.read
          })}>
            <div className="item__img"/>
            <div className="item__txt">
              <h4>{this.getTitle(notif.type)}</h4>
              <p>{notif.content}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.notifications.list
});

export default connect(mapStateToProps, {getNotifs})(Notifications);