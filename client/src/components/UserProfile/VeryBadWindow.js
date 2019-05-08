import React, {Component} from 'react';
import classnames from 'classnames';

import './verybadwindow.css';
import axios from 'axios';

import reportImg from '../../assets/img/vbw-report.svg';
import reportedImg from '../../assets/img/vbw-reported.svg';
import blockImg from '../../assets/img/vbw-block.svg';
import blockedImg from '../../assets/img/vbw-blocked.svg';

class VeryBadWindow extends Component {
  state = {
    step: '',
    opened: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      step: nextProps.step,
      opened: nextProps.step !== ''
    });
  }

  getContent = () => {
    //TODO: Il faut d'autres cas si déjà report/block
    switch (this.state.step) {
      case 'report':
        return (
          <div className="vbw__popup">
            <div className="vbw__title-bar">
              <div className="vbw__close" onClick={this.closePopup}/>
              <h1>Signaler ?</h1>
            </div>
            <div className="vbw__main">
              <img className="vbw__main-img" src={reportImg} alt="report or block"/>
              <div className="vbw__main-txt">
                Êtes-vous sûr(e) de vouloir signaler cet utilisateur ?
              </div>
              <button className="blue vbw__main-button" onClick={this.onReport}>Signaler</button>
            </div>
          </div>
        );
      case 'block':
        return (
          <div className="vbw__popup">
            <div className="vbw__title-bar">
              <div className="vbw__close" onClick={this.closePopup}/>
              <h1>Bloquer ?</h1>
            </div>
            <div className="vbw__main">
              <img className="vbw__main-img" src={blockImg} alt="report or block"/>
              <div className="vbw__main-txt">
                Êtes-vous sûr(e) de vouloir bloquer cet utilisateur ?
              </div>
              <button className="blue vbw__main-button" onClick={this.onBlock}>Bloquer</button>
            </div>
          </div>
        );
      case 'report-success':
        return (
          <div className="vbw__popup">
            <div className="vbw__title-bar">
              <div className="vbw__close" onClick={this.closePopup}/>
              <h1>Signalé.</h1>
            </div>
            <div className="vbw__main">
              <img className="vbw__main-img" src={reportedImg} alt="report or block"/>
              <div className="vbw__main-txt">
                Vous avez bien signalé cet utilisateur. Souhaitez-vous aussi le bloquer ?
              </div>
              <button className="blue vbw__main-button" onClick={this.onBlock}>Bloquer</button>
            </div>
          </div>
        );
      case 'block-success':
        return (
          <div className="vbw__popup">
            <div className="vbw__title-bar">
              <div className="vbw__close" onClick={this.closePopup}/>
              <h1>Bloqué.</h1>
            </div>
            <div className="vbw__main">
              <img className="vbw__main-img" src={blockedImg} alt="report or block"/>
              <div className="vbw__main-txt">
                Vous avez bien bloqué cet utilisateur.
              </div>
            </div>
          </div>
        );
      default:
        return (<div/>);
    }
  };

  onReport = () => {
    axios.post('/api/report', {reported: this.props.userId})
      .then(() => {
        this.setState({
          step: 'report-success'
        });
      })
      .catch();
  };

  onBlock = () => {
    axios.post('/api/block', {blocked: this.props.userId})
      .then(() => {
        this.setState({
          step: 'block-success'
        });
      })
      .catch();
  };

  closePopup = () => {
    this.setState({
      step: '',
      opened: false
    });
    this.props.closeParent();
  };

  render() {
    const content = this.getContent();

    return (
      <div className={classnames('very-bad-window', {
        'opened': this.state.opened
      })}>
        <div className="vbw__overlay" onClick={this.closePopup}/>
        {content}
      </div>
    );
  }
}

export default VeryBadWindow;