import React, {Component} from 'react';
import {connect} from 'react-redux';

import Card from "./Card";

import './soulmatcher.css';

class Soulmatcher extends Component {
  onLike = () => {
    const card = document.querySelector('div.card:last-child');
    if (!card) return;
    card.style.transform = 'translateX(200vw)';
    setTimeout(() => {
      if (card && card.parentElement) {
        card.parentElement.removeChild(card)
      }
    }, 1000);
  };

  onDisike = () => {
    const card = document.querySelector('div.card:last-child');
    if (!card) return;
    card.style.transform = 'translateX(-200vw)';
    setTimeout(() => {
      if (card && card.parentElement) {
        card.parentElement.removeChild(card)
      }
    }, 1000);
  };

  render() {
    return (
      <React.Fragment>
        <div className="centered this">
          <div id="soulmatcher">
            <div className="sidebar">

            </div>
            <div className="main-panel">
              <button className="dislike purple" onClick={this.onDisike}/>
              <div className="cards">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
              </div>
              <button className="like green" onClick={this.onLike}/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, null)(Soulmatcher);