import React, {Component} from 'react';
import classnames from "classnames";

class Notifications extends Component {
  render() {
    return (
      <div className="items">
        <div className={classnames('item', {
          'new': true
        })}>
          <div className="item__img"/>
          <div className="item__txt">
            <h4>Test</h4>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
          </div>
        </div>
        <div className={classnames('item', {
          'new': true
        })}>
          <div className="item__img"/>
          <div className="item__txt">
            <h4>Test</h4>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
          </div>
        </div>
        <div className={classnames('item', {
          'new': false
        })}>
          <div className="item__img"/>
          <div className="item__txt">
            <h4>Test</h4>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
          </div>
        </div>
        <div className={classnames('item', {
          'new': false
        })}>
          <div className="item__img"/>
          <div className="item__txt">
            <h4>Test</h4>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
          </div>
        </div>
        <div className={classnames('item', {
          'new': false
        })}>
          <div className="item__img"/>
          <div className="item__txt">
            <h4>Test</h4>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;