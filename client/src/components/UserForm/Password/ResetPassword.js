import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Spring, config} from 'react-spring/renderprops';
import axios from 'axios';

import imgSuccess from '../../../assets/img/home-success.svg';
import classnames from "classnames";

export class ResetPassword extends Component {
  state = {
    password: '',
    confirm: '',
    step: 0,
    errors: {},
    id: this.props.params.id,
    code: this.props.params.code
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      window.location.href = '/soulmatcher';
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/user/resetPassword', this.state)
      .then(() => {
        this.setState({
          step: 1
        });
      })
      .catch(err => {
        this.setState({errors: err.response.data});
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {errors} = this.state;

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
                  <h2>Réinitialisation.</h2>
                  <p className="subtitle">Retrouvé ? <span onClick={this.props.gotoLogin}>Connectez-vous !</span></p>
                  <input className={classnames('validation', {'invalid': errors.password || errors.confirm})}
                         type="password" name="password" placeholder="Choisissez un mot de passe"
                         title="8 caractères min. dont 1 majuscule et 1 chiffre" required
                         pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$" minLength="8" maxLength="64"
                         onChange={this.onChange}/>
                  <p>{errors.password}&nbsp;</p>
                  <input className={classnames('validation', {'invalid': errors.confirm})}
                         type="password" name="confirm" placeholder="Confirmez le mot de passe"
                         title="8 caractères min. dont 1 majuscule et 1 chiffre" required
                         pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$" minLength="8" maxLength="64"
                         onChange={this.onChange}/>
                  <p>{errors.confirm}&nbsp;</p>
                  <button className="blue" type="submit">Modifier</button>
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
                <h2>Mot de passe modifié !</h2>
                <p className="subtitle" style={{padding: '0 10%', marginBottom: '1.5rem', lineHeight: '1.4rem'}}>
                  Votre mot de passe a bien été changé. Vous pouvez vous connecter.</p>
                <button className="" type="submit" onClick={this.props.gotoLogin}>Retour</button>
              </div>}
            </Spring>
          </React.Fragment>
        );
    }
  }
}

ResetPassword.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {})(ResetPassword);