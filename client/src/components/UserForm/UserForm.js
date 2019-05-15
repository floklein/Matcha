import React, {Component} from 'react';
import queryString from 'query-string';

import RegisterForm from './Register/RegisterForm';
import LoginForm from './Login/LoginForm';
import ForgotPassword from './Password/ForgotPassword';
import ResetPassword from './Password/ResetPassword';
import VerifyEmail from './VerifiyEmail/VerifyEmail';

export class UserForm extends Component {
  state = {
    step: 0
  };

  componentWillMount() {
    const params = queryString.parse(this.props.location.search);
    if (params.action === 'forgot-password') {
      this.setState({
        step: 3,
        params: params
      });
    } else if (params.action === 'verify-email') {
      this.setState({
        step: 4,
        params: params
      });
    }
  }

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
        );
      case 3:
        return (
          <ResetPassword params={this.state.params} gotoLogin={this.gotoLogin}/>
        );
      case 4:
        return (
          <VerifyEmail params={this.state.params} gotoLogin={this.gotoLogin}/>
        );
    }
  }
}

export default UserForm;