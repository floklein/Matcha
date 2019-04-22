import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from "classnames";
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

import Card from "./Card";

import './soulmatcher.css';
import '../../css/nouislider.css';

class Soulmatcher extends Component {
  state = {
    ageMin: '',
    ageMax: '',
    distanceMin: '',
    distanceMax: '',
    popularityMin: '',
    popularityMax: '',
    interests: ''
  };

  componentDidMount() {
    let sliderAge = document.getElementById('age');
    let sliderDistance = document.getElementById('distance');
    let sliderPopularity = document.getElementById('popularity');

    noUiSlider.create(sliderAge, {
      start: [18, 50],
      connect: true,
      range: {
        'min': 18,
        'max': 77
      },
      tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
      pips: {
        mode: 'steps',
        stepped: true,
        density: 6
      }
    });

    noUiSlider.create(sliderDistance, {
      start: [0, 50],
      connect: true,
      range: {
        'min': [0],
        '25%': [10, 1],
        '50%': [50, 5],
        '75%': [100, 50],
        'max': [500]
      },
      tooltips: [wNumb({decimals: 1}), wNumb({decimals: 1})],
      pips: {
        mode: 'range',
        stepped: true,
        density: 4
      }
    });

    noUiSlider.create(sliderPopularity, {
      start: [10, 200],
      connect: true,
      range: {
        'min': 0,
        'max': 200
      },
      tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
      pips: {
        mode: 'steps',
        stepped: true,
        density: 5
      }
    });

    sliderAge.noUiSlider.on('update', (values, handle) => {
      this.setState({
        ageMin: values[0],
        ageMax: values[1]
      });
    });
    sliderDistance.noUiSlider.on('update', (values, handle) => {
      this.setState({
        distanceMin: values[0],
        distanceMax: values[1]
      });
    });
    sliderPopularity.noUiSlider.on('update', (values, handle) => {
      this.setState({
        popularityMin: values[0],
        popularityMax: values[1]
      });
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleChange = (input) => e => {
    this.setState({
      [input]: e.target.value
    });
  };

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
                <div className="sidebar__title-box">
                  <div className="sidebar__title">Trier par</div>
                </div>
                <select name="sort" title="sort" required onChange={() => {
                }} defaultValue="pertinence">
                  <option value="" disabled>Trier par...</option>
                  <option value="relevance">Pertinence</option>
                  <option value="age">Âge</option>
                  <option value="distance">Distance</option>
                  <option value="popularity">Popularité</option>
                  <option value="interests">Intérêts</option>
                </select>
                <select name="order" title="order" required onChange={() => {
                }} defaultValue="asc">
                  <option value="" disabled>En ordre...</option>
                  <option value="asc">Croissant</option>
                  <option value="desc">Décroissant</option>
                </select>
              </div>
              <div className="sidebar__filter">
                <div className="sidebar__title-box">
                  <div className="sidebar__title">Filtrer par</div>
                </div>
                <div>
                  <div className="sidebar__subtitle">Âge</div>
                  <div id="age" className="noUiSlider"/>
                </div>
                <div>
                  <div className="sidebar__subtitle">Distance</div>
                  <div id="distance" className="noUiSlider"/>
                </div>
                <div>
                  <div className="sidebar__subtitle">Popularité</div>
                  <div id="popularity" className="noUiSlider"/>
                </div>
                <div>
                  <div className="sidebar__subtitle">Intérêts</div>
                  <input type="text" name="interest" title="interest" value={this.state.interests}
                         onChange={this.handleChange('interests')} placeholder="ex: Paris, lecture, Kubrick"/>
                </div>
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