import React, {Component} from 'react';
import axios from 'axios';
import {config, Spring} from 'react-spring/renderprops';

import imgSuccess from '../../../assets/img/home-success.svg';
import imgError from '../../../assets/img/home-error.svg';

class VerifyEmail extends Component {
  state = {
    step: 0
  };

  componentWillMount() {
    axios.post('/api/verify', this.props.params)
      .then(res => {
        this.setState({
          step: 0
        });
      })
      .catch(err => {
        this.setState({
          step: 1
        });
      });
  }

  render() {
    switch (this.state.step) {
      default:
      case 0:
        return (
          <React.Fragment>
            <Spring
              config={config.molasses}
              from={{opacity: 0}}
              to={{opacity: 1}}
              leave={{opacity: 0}}>
              {props => <div style={props}>
                <img src={imgSuccess} alt="success"/>
                <h2>Compte vérifié !</h2>
                <p className="subtitle" style={{padding: '0 10%', marginBottom: '1.5rem', lineHeight: '1.4rem'}}>
                  Votre adresse email a bien été vérifiée. Vous pouvez vous connecter.</p>
                <button className="blue" type="submit" onClick={this.props.gotoLogin}>Retour</button>
              </div>}
            </Spring>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Spring
              config={config.molasses}
              from={{opacity: 0}}
              to={{opacity: 1}}
              leave={{opacity: 0}}>
              {props => <div style={props}>
                <img src={imgError} alt="success"/>
                <h2>Mauvais lien.</h2>
                <p className="subtitle" style={{padding: '0 10%', marginBottom: '1.5rem', lineHeight: '1.4rem'}}>
                  Le lien semble invalide. Veuillez vérifier l'email qui vous a été envoyé.</p>
                <button className="" type="submit" onClick={this.props.gotoLogin}>Retour</button>
              </div>}
            </Spring>
          </React.Fragment>
        );
    }

  }
}

export default VerifyEmail;