import React, {Component} from 'react';

import Sidebar from "./Sidebar/sidebar";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/footer";
import ChatPanel from "./Chat/ChatPanel";

class Root extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar/>
        <div id="wrapper">
          <Navbar/>
          <div id="container">
            {this.props.children}
          </div>
          <Footer/>
          <ChatPanel/>
        </div>
      </React.Fragment>
    );
  }
}

export default Root;