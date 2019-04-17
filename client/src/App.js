import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

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
