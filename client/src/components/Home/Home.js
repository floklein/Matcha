import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import UserForm from "../UserForm/UserForm";
import MapContainer from "./HomeMap";

import triCouple from "../../assets/img/tri-couple.svg";
import triMap from "../../assets/img/tri-map.svg";
import triChat from "../../assets/img/tri-chat.svg";

import './home.css';

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/soulmatcher');
    }
    document.title = 'Soulmatch';
  }

  render() {
    return (
      <React.Fragment>
        <div id="carousel" className="centered">
          <div>
            <div>
              <div className="intro">
                <h1>Likez. Matchez. Aimez.</h1>
                <p>Vous cherchez l'amour ? Vous êtes enfin au bon endroit.
                  L'amour est au coin de votre rue et vous ne le saviez pas.
                  Quelques clics vous suffiront et vous le trouverez.</p>
              </div>
            </div>
            <div>
              <div className="login">
                <UserForm location={this.props.location}/>
              </div>
            </div>
          </div>
        </div>
        <div id="triptych" className="centered">
          <div>
            <div>
              <img src={triCouple} alt="test"/>
              <h2>Trouvez votre soulmate</h2>
              <p>Notre algorithme vous aide à trouver la personne faite pour vous.</p>
            </div>
            <div>
              <img src={triMap} alt="test"/>
              <h2>Autour de vous</h2>
              <p>Nous vous faisons découvrir des matchs potentiels au plus près de vous.</p>
            </div>
            <div>
              <img src={triChat} alt="test"/>
              <h2>Matchez et chattez</h2>
              <p>Vous vous plaisez tous les deux ? Deux clics et la discussion s'engage.</p>
            </div>
          </div>
        </div>
        <div id="map">
            <MapContainer/>
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);