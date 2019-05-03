import React, {Component} from 'react';
import classnames from 'classnames';

import './bigpicture.css';

class BigPicture extends Component {
  state = {
    image: '',
    shown: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.image && nextProps.image !== '') {
      this.setState({
        image: nextProps.image,
        shown: true
      });
    }
  }

  render() {
    return (
      <div className={classnames('big-picture', {
        'shown': this.state.shown
      })} onClick={() => this.setState({shown: false})}>
        <div className="bp__img" style={{backgroundImage: this.state.image}}/>
      </div>
    );
  }
}

export default BigPicture;