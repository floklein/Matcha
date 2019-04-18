import React, {Component} from 'react';
import {Spring, config} from 'react-spring/renderprops';

// import Axios from 'axios';

export class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(user);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
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
              <input type="text" name="username" placeholder="Votre pseudo ou votre email"
                     title="Votre pseudo ou votre email" required minLength="1" maxLength="64"
                     value={this.state.username} onChange={this.onChange}/>
              <p>&nbsp;</p>
              <input type="password" name="password" placeholder="Votre mot de passe"
                     title="Votre mot de passe" required minLength="8" maxLength="64"
                     value={this.state.password} onChange={this.onChange}/>
              <p>&nbsp;</p>
              <button className="green" type="submit">Connexion</button>
            </form>
          </div>}
        </Spring>
      </React.Fragment>);
  }
}

export default LoginForm;