import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import './footer.css'

class Footer extends Component {

  render() {

    return (
      <div id="footer" className="centered">
        <div>
          <div>
            <h4>Soulmatch</h4>
            <NavLink to=""><p>Accueil</p></NavLink>
            <NavLink to=""><p>Soulmatcher</p></NavLink>
            <NavLink to=""><p>Recherche</p></NavLink>
          </div>
          <div>
            <h4>Mon compte</h4>
            <NavLink to=""><p>Mon profil</p></NavLink>
            <NavLink to=""><p>Mes préférences</p></NavLink>
            <NavLink to=""><p>Déconnexion</p></NavLink>
          </div>
          <div>
            <h4>L'équipe</h4>
            <NavLink to=""><p>Florent Klein</p></NavLink>
            <NavLink to=""><p>Tanguy Boissel</p></NavLink>
          </div>
          <div>
            <h4>À propos</h4>
            <NavLink to=""><p>© 2019 Soulmatch</p></NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
