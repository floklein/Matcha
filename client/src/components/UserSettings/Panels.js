import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';

import {changeEmail, changeNotifs, changePassword} from '../../store/actions/settingsActions';

class Panels extends Component {
  state = {
    errors: {},
    email: '',
    password: '',
    oldPassword: '',
    newPassword: '',
    newConfirm: '',
    notifVisit: true,
    notifLike: true,
    notifUnlike: true,
    notifMatch: true,
    notifMessage: true,
    sure: false
  };

  componentWillMount() {
    axios.get('/api/notifs/settings')
      .then(res => {
        this.setState({
            ...res.data
          });
      })
      .catch(err => {})
  }

  submitEmail = (e) => {
    this.props.changeEmail(this.state);
  };

  deleteAccount = (e) => {
    e.preventDefault();

    if (this.state.sure) {
      console.log('delete');
    } else {
      this.setState({
        sure: true
      });
    }
  };

  submitPassword = (e) => {
    e.preventDefault();

    this.props.changePassword(this.state);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleToggle = (e) => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
    setTimeout(() => {
      this.props.changeNotifs(this.state);
    }, 100);
  };

  render() {
    const {
      errors, email, sure, password, oldPassword, newPassword, newConfirm,
      notifVisit, notifLike, notifUnlike, notifMatch, notifMessage
    } = this.state;

    switch (this.props.step) {
      default:
      case 0:
        return (
          <React.Fragment>
            <h1 className="settings__component">Mon compte</h1>
            <form className="settings__component">
              <label>Changer mon adresse email</label>
              <input
                className={classnames('validation', {'invalid': errors.email})}
                type="email"
                name="email"
                placeholder="Votre nouvelle adresse email"
                title="example@soulmatch.com"
                required
                minLength="1"
                maxLength="64"
                value={email}
                onChange={this.handleChange}
                onBlur={this.submitEmail}/>
            </form>
            <form className="settings__component" onSubmit={this.deleteAccount}>
              <label>Supprimer mon compte</label>
              <input
                className={classnames('', {'invalid': errors.password})}
                type="password"
                name="password"
                placeholder="Confirmez votre mot de passe"
                title="Votre mot de passe"
                required
                minLength="8"
                maxLength="64"
                value={password}
                onChange={this.handleChange}/>
              <button type="submit" className="purple delete">{sure ? 'Vraiment ?' : 'Supprimer'}</button>
            </form>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <h1 className="settings__component">Notifications</h1>
            <form className="settings__component">
              <label>Être notifié quand :</label><br/>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="notifVisit"
                  name="notifVisit"
                  checked={notifVisit}
                  onChange={this.handleToggle}/>
                <div/>
                <label htmlFor="notifVisit">Quelqu'un visite mon profil.</label>
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="notifLike"
                  name="notifLike"
                  checked={notifLike}
                  onChange={this.handleToggle}/>
                <div/>
                <label htmlFor="notifLike">Quelqu'un m'aime.</label>
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="notifUnlike"
                  name="notifUnlike"
                  checked={notifUnlike}
                  onChange={this.handleToggle}/>
                <div/>
                <label htmlFor="notifUnlike">Quelqu'un ne m'aime plus.</label>
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="notifMatch"
                  name="notifMatch"
                  checked={notifMatch}
                  onChange={this.handleToggle}/>
                <div/>
                <label htmlFor="notifMatch">Je matche avec quelqu'un.</label>
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="notifMessage"
                  name="notifMessage"
                  checked={notifMessage}
                  onChange={this.handleToggle}/>
                <div/>
                <label htmlFor="notifMessage">Je reçois un message.</label>
              </div>
            </form>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <h1 className="settings__component">Sécurité</h1>
            <form className="settings__component" onSubmit={this.submitPassword}>
              <label>Retapez votre ancien mot de passe</label>
              <input
                className={classnames('', {'invalid': errors.password})}
                type="password"
                name="oldPassword"
                placeholder="Votre ancien mot de passe"
                title="Votre mot de passe"
                required
                minLength="8"
                maxLength="64"
                value={oldPassword}
                onChange={this.handleChange}/>
              <label>Choisissez un nouveau mot de passe</label>
              <input
                className={classnames('validation', {'invalid': errors.newPassword || errors.newConfirm})}
                type="password"
                name="newPassword"
                placeholder="8 car. min (dont 1 maj. & 1 chiffre)"
                title="8 caractères min. dont 1 majuscule et 1 chiffre"
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$"
                minLength="8"
                maxLength="64"
                value={newPassword}
                onChange={this.handleChange}/>
              <label>Confirmez le nouveau mot de passe</label>
              <input
                className={classnames('validation', {'invalid': errors.newPassword || errors.newConfirm})}
                type="password"
                name="newConfirm"
                placeholder="8 car. min (dont 1 maj. & 1 chiffre)"
                title="8 caractères min. dont 1 majuscule et 1 chiffre"
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$"
                minLength="8"
                maxLength="64"
                value={newConfirm}
                onChange={this.handleChange}/>
              <button type="submit" className="blue">Modifier</button>
            </form>
          </React.Fragment>
        );
    }
  }
}

export default connect(null, {changeEmail, changeNotifs, changePassword})(Panels);