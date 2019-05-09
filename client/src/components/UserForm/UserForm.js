import React, {Component} from 'react';

import RegisterForm from './Register/RegisterForm';
import LoginForm from './Login/LoginForm';
import ForgotPassword from './ForgotPassword/ForgotPassword';

export class UserForm extends Component {
  state = {
    step: 0
  };

  // Go to next step
  gotoLogin = () => {
    this.setState({
      step: 1
    });
  };

  // Go back to previous step
  gotoRegister = () => {
    this.setState({
      step: 0
    });
  };

  gotoForgotPassword = () => {
    this.setState({
      step: 2
    });
  };

  render() {
    const {step} = this.state;

    switch (step) {
      default:
      case 0:
        return (
          <RegisterForm gotoLogin={this.gotoLogin}/>
        );
      case 1:
        return (
          <LoginForm gotoRegister={this.gotoRegister} gotoForgotPassword={this.gotoForgotPassword}/>
        );
      case 2:
        return (
          <ForgotPassword gotoLogin={this.gotoLogin}/>
        )
    }
  }
}

export default UserForm;