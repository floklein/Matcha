import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import brokenHeart from "../assets/img/heartbroken.png";

class Error extends Component {
  getError = () => {
    return {
      errTitle: this.props.errTitle ? this.props.errTitle : 'Erreur 404.',
      errText: this.props.errText ? this.props.errText : 'il semblerait que la page que vous recherchez n\'existe pas.'
    }
  };

  render() {
    const {errTitle, errText} = this.getError();

    return (
      <div className="centered">
        <div className="centered-window">
          <div className="error__window">
            <div>
              <img src={brokenHeart} alt=""/>
            </div>
            <div>
              <h1>Oups !</h1>
              <h4>{errTitle}</h4>
              <p>Ça nous brise le cœur, mais {errText}</p>
              <NavLink to='/'>
                <button>Retour</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;