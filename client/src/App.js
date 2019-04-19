import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import {logoutUser, setCurrentUser} from "./store/actions/authActions";
import setAuthToken from './utils/setAuthToken';

import store from './store';
import Root from './components/Root';
import Home from './components/Home';
import Error from './components/Error';
import Profile from './components/UserProfile/Profile';
import MyProfile from './components/UserProfile/MyProfile';
import EditProfile from './components/UserProfile/EditProfile';

import './css/normalize.css';
import './css/global.css';
import './css/index.css';
import './css/error.css';

if (localStorage.jwtToken && localStorage.jwtToken !== 'undefined') {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //TODO: Clear current profile
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Root>
            <Switch>
              <Route path={'/'} exact component={Home}/>
              <Route path={'/profile/:username'} exact component={Profile}/>
              <Route path={'/account/profile'} exact component={MyProfile}/>
              <Route path={'/account/profile/edit'} exact component={EditProfile}/>
              <Route component={Error}/>
            </Switch>
          </Root>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
