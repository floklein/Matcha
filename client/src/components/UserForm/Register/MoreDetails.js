import React, {Component} from 'react';
import {Spring, config} from 'react-spring/renderprops';
import classnames from "classnames";
import axios from "axios";

export class MoreDetails extends Component {
  state = {
    errors: {}
  };

  continue = e => {
    e.preventDefault();

    const {values} = this.props;

    axios.post('/api/user/register', values)
      .then(() => {
        this.props.nextStep();
      })
      .catch(err => {
        this.setState({errors: err.response.data});
      });
  };

  previous = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {values, handleChange} = this.props;
    const {errors} = this.state;

    return (
      <React.Fragment>
        <Spring
          config={config.molasses}
          from={{opacity: 0}}
          to={{opacity: 1}}>
          {props => <div style={props}>
            <h2>À propos de vous.</h2>
            <p className="subtitle">Dites-nous en plus...</p>
            <input className={classnames('validation', {'invalid': errors.username})}
                   type="text" name="username" placeholder="Choisissez un pseudo"
                   title="4 à 30 lettres minuscules" required pattern="^[a-zA-Z]{4,30}$" minLength="4" maxLength="30"
                   onChange={handleChange('username')} defaultValue={values.username}/>
            <p>{errors.username}&nbsp;</p>
            <input className={classnames('smaller-input validation', {'invalid': errors.lastName || errors.name})}
                   style={{marginRight: 3 + '%'}} type="text" name="lastname"
                   placeholder="Nom" title="1 à 30 lettres" required
                   pattern="^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$"
                   minLength="1" maxLength="30"
                   onChange={handleChange('lastName')} defaultValue={values.lastName}/>
            <input className={classnames('smaller-input validation', {'invalid': errors.firstName || errors.name})}
                   type="text" name="firstname" placeholder="Prénom"
                   title="1 à 30 lettres" required
                   pattern="^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$"
                   minLength="1" maxLength="30"
                   onChange={handleChange('firstName')} defaultValue={values.firstName}/>
            <p>{errors.name}{errors.lastName}{errors.firstName}&nbsp;</p>
            <select className={classnames('validation', {'invalid': errors.gender})}
                    name="gender" title="gender" required
                    onChange={handleChange('gender')} defaultValue={values.gender}>
              <option value="" disabled hidden>Genre</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </select>
            <p>{errors.gender}&nbsp;</p>
            <button className="back-btn" onClick={this.previous}>&nbsp;</button>
            <button className="pink" onClick={this.continue}>S'inscrire</button>
          </div>}
        </Spring>
      </React.Fragment>);
  }
}

export default (MoreDetails);