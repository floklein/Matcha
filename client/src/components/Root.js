import React, {Component} from 'react';
import {connect} from 'react-redux';

import Sidebar from "./Sidebar/sidebar";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/footer";
import ChatPanel from "./Chat/ChatPanel";
import PopUp from './PopUp/PopUp';

class Root extends Component {
  render() {
    const isAuth = this.props.auth.isAuthenticated;

    return (
      <React.Fragment>
        <Sidebar/>
        <div id="wrapper">
          <Navbar/>
          <PopUp/>
          <div id="container">
            {this.props.children}
          </div>
          <Footer/>
          {isAuth && (<ChatPanel/>)}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Root);