import React, {Component} from 'react';

class ContentEditable extends Component {
  style = {
    outline: 'none'
  };

  constructor(props) {
    super();
    this.myRef = React.createRef();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.myRef.current.innerHTML;
  }

  emitChange = () => {
    let html = this.myRef.current.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  };

  render() {
    return (<span
      ref={this.myRef}
      onInput={this.emitChange}
      onBlur={this.emitChange}
      contentEditable
      dangerouslySetInnerHTML={{__html: this.props.html}}
      style={this.style}/>);
  }
}

export default ContentEditable;