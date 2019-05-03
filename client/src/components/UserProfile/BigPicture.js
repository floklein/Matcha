import React, {Component} from 'react';
import classnames from 'classnames';

import './bigpicture.css';

class BigPicture extends Component {
  state = {
    images: [],
    current: 0,
    shown: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.images && nextProps.images !== '') {
      this.setState({
        images: nextProps.images,
        current: nextProps.current,
        shown: true
      });
    }
  }

  render() {
    return (
      <div className={classnames('big-picture', {
        'shown': this.state.shown
      })}>
        <div className="bp__overlay" onClick={() => this.setState({shown: false})}/>
        <div className="bp__img" style={{backgroundImage: `url("${this.state.images[this.state.current]}")`}}>
          <div className="bp__previous">
            <button className="bp__button" onClick={() => this.setState({current: (this.state.current + 4) % this.state.images.length})}/>
          </div>
          <div className="bp__next">
            <button className="bp__button" onClick={() => this.setState({current: (this.state.current + 1) % this.state.images.length})}/>
          </div>
        </div>
      </div>
    );
  }
}

export default BigPicture;