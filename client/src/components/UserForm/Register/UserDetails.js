import React, {Component} from 'react';
import {Spring, config} from 'react-spring/renderprops';
import Axios from "axios";
import classnames from 'classnames';

export class UserDetails extends Component {
  state = {
    errors: {}
  };

  continue = e => {
    e.preventDefault();
    const {values} = this.props;

    Axios.post('/api/user/preregister', values)
      .then(res => {
        console.log(res.data);
        this.props.nextStep();
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({errors: err.response.data});
      });
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
            <h2>Créer un compte.</h2>
            <p className="subtitle">Déjà inscrit ? <span onClick={this.props.gotoLogin}>Connectez-vous !</span></p>
            <input className={classnames('validation', {'invalid': errors.email})}
                   type="email" name="email" placeholder="Votre adresse email"
                   title="example@soulmatch.com" required minLength="1" maxLength="64"
                   onChange={handleChange('email')} defaultValue={values.email}/>
            <p>{errors.email}&nbsp;</p>
            <input className={classnames('validation', {'invalid': errors.password || errors.confirm})}
                   type="password" name="password" placeholder="Choisissez un mot de passe"
                   title="8 caractères min. dont 1 majuscule et 1 chiffre" required
                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$" minLength="8" maxLength="64"
                   onChange={handleChange('password')} defaultValue={values.password}/>
            <p>{errors.password}&nbsp;</p>
            <input className={classnames('validation', {'invalid': errors.confirm})}
                   type="password" name="confirm" placeholder="Confirmez le mot de passe"
                   title="8 caractères min. dont 1 majuscule et 1 chiffre" required
                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$" minLength="8" maxLength="64"
                   onChange={handleChange('confirm')} defaultValue={values.confirm}/>
            <p>{errors.confirm}&nbsp;</p>
            <button className="blue" onClick={this.continue}>Suivant</button>
          </div>}
        </Spring>
      </React.Fragment>);
  }
}

export default UserDetails;