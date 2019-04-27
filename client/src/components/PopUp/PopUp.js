import React, {Component} from 'react';
import {connect} from 'react-redux';

import './popup.css';

class PopUp extends Component {
  state = {
    text: 'Je suis un message d\'erreur !'
  };

  componentWillReceiveProps(nextProps) {
    Object.keys(nextProps.error).forEach((errorName) => {
      this.setState({
        text: nextProps.error[errorName]
      });
    });
    const popup = document.getElementById('error-popup');
    popup.style.marginTop = '1rem';
    setTimeout(() => {
      popup.style.marginTop = '-10rem';
    }, 2500);
  }

  render() {
    return (
      <div id="error-popup" className="popup">
        {this.state.text}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.errors
});

export default connect(mapStateToProps, null)(PopUp);