import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import heartbroken from "../assets/img/heartbroken.png";

class Error extends Component {
  render() {
    return (
      <div className="centered">
        <div className="errorGrid">
        <img className="heartbroken" src={heartbroken} alt="coeur brisé"></img>
          <h1>Erreur 404</h1>
          <h2>La page que vous recherchez n'existe pas</h2>
          <NavLink to="/search">Cliquez ici pour effectuer une nouvelle recherche</NavLink>
        </div>
      </div>
    );
  }
}

export default Error;