import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noUiSlider from 'nouislider';
import ReactTags from 'react-tag-autocomplete';
import wNumb from 'wnumb';
import axios from 'axios';

import {searchUsers} from "../../store/actions/searchActions";

import Preview from './Preview';

import './search.css';
import '../../css/nouislider.css';

class Search extends Component {
  state = {
    users: [],
    sort: 'distance',
    order: 'asc',
    ageMin: 18,
    ageMax: 50,
    rangeAgeMax: 50,
    latitude: 1,
    longitude: 50,
    popularityMin: 10,
    popularityMax: 200,
    rangePopMax: 200,
    from: 0,
    to: 20,
    interests: [],
    suggestions: [],
  };

  onScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      this.fetchUsers();
    }
  };

  componentWillMount() {
    axios.get('/api/interests/getAll')
      .then((res) => {
        axios.get('/api/user/getMaxPopAndAge')
          .then((res2) => {
            setTimeout(() => {
              this.setState({
                suggestions: res.data,
                rangePopMax: res2.data[0].max_pop,
                rangeAgeMax: res2.data[0].max_age
              });

              let sliderAge = document.getElementById('age');
              let sliderPopularity = document.getElementById('popularity');
              sliderAge.noUiSlider.updateOptions({
                range: {
                  'min': [18],
                  'max': [this.state.rangeAgeMax]
                }
              });
              sliderPopularity.noUiSlider.updateOptions({
                range: {
                  'min': 0,
                  'max': this.state.rangePopMax
                }
              });

            }, 1);
          });
      });
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  componentDidMount() {
    let sliderAge = document.getElementById('age');
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
    noUiSlider.create(sliderPopularity, {
      start: [10, this.state.popularityMax],
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
    sliderPopularity.noUiSlider.on('update', (values, handle) => {
      this.setState({
        popularityMin: parseInt(values[0], 10),
        popularityMax: parseInt(values[1], 10)
      });
    });
    this.props.searchUsers(this.state);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users && Array.isArray(nextProps.users) && nextProps.users !== this.props.users) {
      this.setState({
        users: this.state.users.concat(nextProps.users)
      });
    }
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

  fetchUsers = () => {
    this.setState({
      from: this.state.to,
      to: this.state.to + 4
    });
    this.props.searchUsers(this.state);
  };

  newUsers = () => {
    this.setState({
      from: 0,
      to: 20,
      users: []
    });
    this.props.searchUsers(this.state);
  };

  render() {
    const {users} = this.state;

    return (
      <React.Fragment>
        <div className="centered this">
          <div id="search">
            <div className="sidebar">
              <div className="sidebar__sort">
                <div className="sidebar__title-box">
                  <div className="sidebar__title thanos">Trier par</div>
                </div>
                <select name="sort" title="sort" required onChange={this.handleChange('sort')}
                        defaultValue="distance">
                  <option value="" disabled>Trier par...</option>
                  <option value="age">Âge</option>
                  <option value="distance">Distance</option>
                  <option value="popularity">Popularité</option>
                  <option value="interests">Intérêts</option>
                </select>
                <select name="order" title="order" required onChange={this.handleChange('order')}
                        defaultValue="asc">
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
                  <div className="sidebar__subtitle">Popularité</div>
                  <div id="popularity" className="noUiSlider"/>
                </div>
                <div>
                  <div className="sidebar__subtitle">Intérêts</div>
                  <ReactTags tags={this.state.interests} suggestions={this.state.suggestions}
                             minQueryLength={1}
                             handleDelete={this.handleDelete.bind(this)}
                             handleAddition={this.handleAdd.bind(this)}
                             placeholder="ex: Paris, lecture, Kubrick"
                             autofocus={false}/>
                </div>
                <button className={classnames('sidebar__button blue', {
                  'loading': this.props.loading
                })} onClick={this.newUsers}>Modifier
                </button>
              </div>
            </div>
            <div className="main-panel avengers">
              {(users && Array.isArray(users)) && users.map((user, i) => (
                <Preview key={i} userId={user.id}/>
              ))}
              {(this.props.loading && (<div className="loading-more"/>))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  users: state.search.users,
  loading: state.search.loading
});

export default connect(mapStateToProps, {searchUsers})(Search);