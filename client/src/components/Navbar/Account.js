import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";

import {logoutUser} from "../../store/actions/authActions";

class Account extends Component {
  onLogoutClick = () => {
    this.props.logoutUser();
    window.location.href = '/';
  };

  render() {
    return (
      <React.Fragment>
        <NavLink className="item profile" to="/account/profile">
            <div className="item__img"/>
            <div className="item__txt">
              <h4>Mon profil</h4>
              <p>Comment les autres utilisateurs voient-ils mon profil ?</p>
            </div>
        </NavLink>
        <a className="item edit" href="/account/profile/edit">
            <div className="item__img"/>
            <div className="item__txt">
              <h4>Éditer mon profil</h4>
              <p>Modifier mes informations publiques (sexe, âge, etc).</p>
            </div>
        </a>
        <NavLink className="item settings" to="/account/settings">
            <div className="item__img"/>
            <div className="item__txt">
              <h4>Mes préférences</h4>
              <p>Changer mon mot de passe ou mon adresse email.</p>
            </div>
        </NavLink>
        <div className="item logout" onClick={this.onLogoutClick}>
          <div className="item__img"/>
          <div className="item__txt">
            <h4>Se déconnecter</h4>
            <p>Partir, pour mieux revenir !</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, {logoutUser})(Account);