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
    if (nextProps.images && Array.isArray(nextProps.images)) {
      this.setState({
        images: nextProps.images,
        current: nextProps.current,
        shown: nextProps.shown
      });
    }
  }

  render() {
    const image = this.state.images[this.state.current];
    if (!image) {
      return (<React.Fragment/>);
    }

    return (
      <div className={classnames('big-picture', {
        'shown': this.state.shown
      })}>
        <div className="bp__overlay" onClick={this.props.closeBigPicture}/>
        <div className="bp__img" style={{backgroundImage: `url("${image.url}")`}}>
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