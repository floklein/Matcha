import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import ReactTags from 'react-tag-autocomplete';
import axios from 'axios';

import Card from "./Card";

// import {likeUser} from "../../store/actions/profileActions";

import './soulmatcher.css';
import '../../css/nouislider.css';
import {getUsers} from "../../store/actions/soulmatcherActions";

class Soulmatcher extends Component {
  state = {
    soulmatcher: {
      users: []
    },
    sort: 'relevance',
    order: 'desc',
    ageMin: 18,
    ageMax: 50,
    distanceMin: 0,
    distanceMax: 50,
    popularityMin: 10,
    popularityMax: 200,
    interests: [],
    suggestions: []
  };

  componentWillMount() {
    axios.get('/api/interests/getAll')
      .then((res) => {
        this.setState({
          suggestions: res.data,
        });
      });
  }

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
        ageMin: parseInt(values[0], 10),
        ageMax: parseInt(values[1], 10)
      });
    });
    sliderDistance.noUiSlider.on('update', (values, handle) => {
      this.setState({
        distanceMin: parseFloat(values[0]),
        distanceMax: parseFloat(values[1])
      });
    });
    sliderPopularity.noUiSlider.on('update', (values, handle) => {
      this.setState({
        popularityMin: parseInt(values[0], 10),
        popularityMax: parseInt(values[1], 10)
      });
    });

    this.props.getUsers(this.state);
  }

  handleChange = (input) => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleDelete(i) {
    const interests = this.state.interests.slice(0);
    interests.splice(i, 1);
    this.setState({interests});
  }

  handleAdd(interest) {
    const interests = [].concat(this.state.interests, interest);
    this.setState({interests});
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

  onGetUsers = () => {
    this.props.getUsers(this.state);
  };

  render() {
    const {users} = this.props;

    return (
      <React.Fragment>
        <div className="centered this">
          <div id="soulmatcher">
            <div className="sidebar">
              <div className="sidebar__sort">
                <div className="sidebar__title-box">
                  <div className="sidebar__title">Trier par</div>
                </div>
                <select name="sort" title="sort" required onChange={this.handleChange('sort')}
                        defaultValue="pertinence">
                  <option value="" disabled>Trier par...</option>
                  <option value="relevance">Pertinence</option>
                  <option value="age">Âge</option>
                  <option value="distance">Distance</option>
                  <option value="popularity">Popularité</option>
                  <option value="interests">Intérêts</option>
                </select>
                <select name="order" title="order" required onChange={this.handleChange('order')}
                        defaultValue="desc">
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
                  <ReactTags tags={this.state.interests} suggestions={this.state.suggestions}
                             handleDelete={this.handleDelete.bind(this)}
                             handleAddition={this.handleAdd.bind(this)}
                             placeholder="ex: Paris, lecture, Kubrick"/>
                </div>
                <button className="sidebar__button blue" onClick={this.onGetUsers}>Modifier</button>
              </div>
            </div>
            <div className="main-panel">
              <button className="dislike purple" onClick={this.onDislike}/>
              <div className="cards">
                <div className="no-cards">
                  <h1>Pas de profils</h1>
                  <p>Ça nous brise le cœur, mais aucun autre profil ne correspond à vos préférences et
                    vos filtres.</p>
                </div>
                {(users && Array.isArray(users)) &&
                users.slice().reverse().map((user, i) => (
                  <Card key={user.id} userId={user.id} distance={user.dist}/>
                ))}
              </div>
              <button className="like green" onClick={this.onLike}/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Soulmatcher.propTypes = {
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.soulmatcher.users
});

export default connect(mapStateToProps, {getUsers})(Soulmatcher);