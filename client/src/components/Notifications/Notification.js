import React, {Component} from 'react';
import classnames from 'classnames';

class Notification extends Component {
  state = {
    step: 'start'
  };

  getTitle = (type) => {
    switch (type) {
      case 'visit':
        return 'Admirateur ou admiratrice ?';
      case 'like':
        return 'Love is in the air!';
      case 'unlike':
        return 'Ça nous brise le cœur...';
      case 'match':
        return 'Faits l\'un pour l\'autre.';
      case 'message':
        return 'C\'est l\'facteur !';
      default:
        return 'Bonjour !';
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        step: 'display'
      });
      setTimeout(() => {
        this.setState({
          step: 'end'
        });
        setTimeout(() => {
          this.setState({
            step: 'dead'
          });
          setTimeout(() => {
            this.props.killMe(this.props.notif.id);
          }, 1000);
        }, 1000);
      }, 5000);
    }, 100);
  }

  render() {
    const {content, type} = this.props.notif;
    const {step} = this.state;

    return (
      <div className={classnames('notification', {
        'start': step === 'start',
        'display': step === 'display',
        'end': step === 'end',
        'dead': step === 'dead'
      })}>
        <div className="notif__icon"/>
        <div className="notif__text">
          <div className="notif__type">{this.getTitle(type)}</div>
          <div className="notif__content">{content}</div>
        </div>
      </div>
    );
  }
}

export default Notification;