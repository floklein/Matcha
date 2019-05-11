import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Spring, config} from 'react-spring/renderprops';
import axios from 'axios';

import imgSuccess from '../../../assets/img/email-sent.svg';

export class ForgotPassword extends Component {
  state = {
    email: '',
    step: 0
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      window.location.href = '/soulmatcher';
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/user/forgotPassword', {email: this.state.email})
      .then(() => {
        this.setState({
          step: 1
        });
      })
      .catch(() => {
        this.setState({
          step: 1
        });
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    switch (this.state.step) {
      default:
      case 0:
        return (
          <React.Fragment>
            <Spring
              config={config.molasses}
              from={{opacity: 0}}
              to={{opacity: 1}}>
              {props => <div style={props}>
                <form onSubmit={this.onSubmit}>
                  <h2>Mot de passe oublié.</h2>
                  <p className="subtitle">Retrouvé ? <span onClick={this.props.gotoLogin}>Connectez-vous !</span></p>
                  <input type="email" name="email" placeholder="Votre adresse email"
                         title="Votre pseudo ou votre email" required minLength="1" maxLength="64"
                         value={this.state.email} onChange={this.onChange}/>
                  <p>&nbsp;</p>
                  <button className="blue" type="submit">Valider</button>
                </form>
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
                <img src={imgSuccess} alt="success"/>
                <h2>Vérifiez vos mails !</h2>
                <p className="subtitle" style={{padding: '0 10%', marginBottom: '1.5rem', lineHeight: '1.4rem'}}>
                  Nous vous avons envoyé un mail de réinitialisation.</p>
              </div>}
            </Spring>
          </React.Fragment>
        );
    }
  }
}

ForgotPassword.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {})(ForgotPassword);