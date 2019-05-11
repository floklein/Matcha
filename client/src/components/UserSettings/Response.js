import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

class Response extends Component {
  state = {
    shown: false,
    outcome: 'success',
    message: ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.response && nextProps.response !== this.props.response) {
      this.setState({
        shown: true,
        outcome: nextProps.response.outcome,
        message: nextProps.response.message
      });
      setTimeout(() => {
        this.setState({
          shown: false
        });
      }, 5000);
    }
  }

  render() {
    const {shown, outcome, message} = this.state;

    if (shown) {
      return (
        <div className={classnames('settings__component settings__response', {
          'error': outcome === 'error'
        })}>
          {message}
        </div>
      );
    } else {
      return (<React.Fragment/>);
    }
  }
}

const mapStateToProps = (state) => ({
  response: state.settings.response
});

export default connect(mapStateToProps)(Response);