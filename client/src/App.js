import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import store from './store';

import ProtectedRoute from './components/ProtectedRoute';
import Root from './components/Root';
import Home from './components/Home/Home';
import Error from './components/Error';
import Profile from './components/UserProfile/Profile';
import MyProfile from './components/UserProfile/MyProfile';
import EditProfile from './components/UserProfile/EditProfile';
import Soulmatcher from './components/Soulmatcher/Soulmatcher';
import Search from './components/Search/Search';

import {logoutUser, setCurrentUser} from "./store/actions/authActions";
import setAuthToken from './utils/setAuthToken';

import './css/normalize.css';
import './css/global.css';
import './css/error.css';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

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
              <ProtectedRoute path={'/soulmatcher'} exact component={Soulmatcher}/>
              <ProtectedRoute path={'/search'} exact component={Search}/>
              <Route path={'/profile/:username'} exact component={Profile}/>
              <ProtectedRoute path={'/account/profile'} exact component={MyProfile}/>
              <ProtectedRoute path={'/account/profile/edit'} exact component={EditProfile}/>
              <Route component={Error}/>
            </Switch>
          </Root>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;