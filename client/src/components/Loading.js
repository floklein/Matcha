import React, {Component} from 'react';

import '../css/loading.css';
import loadingImg from '../assets/img/loading.svg';

class Loading extends Component {
  render() {
    return (
      <div className="centered">
        <img className="loading" src={loadingImg} alt="loading"/>
      </div>
    );
  }
}

export default Loading;