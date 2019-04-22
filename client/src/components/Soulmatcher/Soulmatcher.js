import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from "classnames";
import noUiSlider from 'nouislider';

import Card from "./Card";

import './soulmatcher.css';

class Soulmatcher extends Component {
  componentDidMount() {
    let sliderAge = document.getElementById('age');

    noUiSlider.create(sliderAge, {
      start: [18, 100],
      connect: true,
      range: {
        'min': 18,
        'max': 100
      }
    });
  }

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

  onDislike = () => {
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
              <div className="sidebar__sort">
                <div className="sidebar__title">Trier par</div>
                <select name="sort" title="sort" required onChange={() => {}} defaultValue="pertinence">
                  <option value="" disabled>Trier par...</option>
                  <option value="relevance">Pertinence</option>
                  <option value="age">Âge</option>
                  <option value="distance">Distance</option>
                  <option value="popularity">Popularité</option>
                  <option value="interests">Intérêts</option>
                </select>
                <select name="order" title="order" required onChange={() => {}} defaultValue="asc">
                  <option value="" disabled>En ordre...</option>
                  <option value="asc">Croissant</option>
                  <option value="desc">Décroissant</option>
                </select>
              </div>
              <div className="sidebar__filter">
                <div className="sidebar__title">Filtrer par</div>
                <div id="age"/>
                {/*<input type="text"/>*/}
                {/*<input type="text"/>*/}
                {/*<input type="text"/>*/}
                {/*<input type="text"/>*/}
              </div>
            </div>
            <div className="main-panel">
              <button className="dislike purple" onClick={this.onDislike}/>
              <div className="cards">
                <div className="no-cards">
                  <h1>Pas de profils</h1>
                  <p>Ça nous brise le cœur, mais aucun autre profil ne correspond à vos préférences et vos filtres.</p>
                </div>
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