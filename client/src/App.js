import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers';
import { Spring } from 'react-spring/renderprops';

class App extends Component {
  render() {
    return (
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props => <div style={props}>hello</div>}
          </Spring>
      );
  }
}

export default App;
