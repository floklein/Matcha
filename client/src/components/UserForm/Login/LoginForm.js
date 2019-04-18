import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Spring, config} from 'react-spring/renderprops';
import classnames from 'classnames';

import {loginUser} from '../../../store/actions/authActions';

export class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // this.props.history.push('/profile/log');
      alert('loggé !');
    }

    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {errors} = this.state;

    return (
      <React.Fragment>
        <Spring
          config={config.molasses}
          from={{opacity: 0}}
          to={{opacity: 1}}>
          {props => <div style={props}>
            <form onSubmit={this.onSubmit}>
              <h2>Se connecter.</h2>
              <p className="subtitle">Pas de compte ? <span onClick={this.props.gotoRegister}>Inscrivez-vous !</span>
              </p>
              <input className={classnames('', {'invalid': errors.login})}
                     type="text" name="username" placeholder="Votre pseudo ou votre email"
                     title="Votre pseudo ou votre email" required minLength="1" maxLength="64"
                     value={this.state.username} onChange={this.onChange}/>
              <p>&nbsp;</p>
              <input className={classnames('', {'invalid': errors.login})}
                     type="password" name="password" placeholder="Votre mot de passe"
                     title="Votre mot de passe" required minLength="8" maxLength="64"
                     value={this.state.password} onChange={this.onChange}/>
              <p>{errors.login}&nbsp;</p>
              <button className="green" type="submit">Connexion</button>
            </form>
          </div>}
        </Spring>
      </React.Fragment>);
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(LoginForm);