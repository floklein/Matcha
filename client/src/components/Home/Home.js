import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import UserForm from "../UserForm/UserForm";

import triCouple from "../assets/img/tri-couple.svg";
import triMap from "../assets/img/tri-map.svg";
import triChat from "../assets/img/tri-chat.svg";
import MapContainer from "./GoogleMap";

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/soulmatcher');
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="carousel" className="centered">
          <div>
            <div>
              <div className="intro">
                <h1>Likez. Matchez. Aimez.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam aspernatur
                  cupiditate
                  dolor doloribus incidunt inventore natus similique sunt vitae!</p>
              </div>
            </div>
            <div>
              <div className="login">
                <UserForm/>
              </div>
            </div>
          </div>
        </div>
        <div id="triptych" className="centered">
          <div>
            <div>
              <img src={triCouple} alt="test"/>
              <h2>Trouvez votre soulmate</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, fuga.</p>
            </div>
            <div>
              <img src={triMap} alt="test"/>
              <h2>Autour de vous</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, fuga.</p>
            </div>
            <div>
              <img src={triChat} alt="test"/>
              <h2>Matchez et chattez</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, fuga.</p>
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