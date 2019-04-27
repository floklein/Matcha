import React, {Component} from 'react';
import classnames from "classnames";
import noUiSlider from "nouislider";
import ReactTags from "react-tag-autocomplete";
import wNumb from "wnumb";

import Preview from './Preview';

import './search.css';
import '../../css/nouislider.css';

class Search extends Component {
  state = {
    users: [],
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

  render() {
    return (
      <React.Fragment>
        <div className="centered this">
          <div id="search">
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
                             minQueryLength={1}
                             handleDelete={this.handleDelete.bind(this)}
                             handleAddition={this.handleAdd.bind(this)}
                             placeholder="ex: Paris, lecture, Kubrick"/>
                </div>
                <button className={classnames('sidebar__button blue', {
                  'loading': this.props.loading
                })} onClick={() => {
                }}>Modifier
                </button>
              </div>
            </div>
            <div className="main-panel">
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
              <Preview/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;