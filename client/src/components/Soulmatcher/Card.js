import React, {Component} from 'react';
import {connect} from 'react-redux';

class Card extends Component {
  timeout;
  dx;
  dy;

  onDrag = (e) => {
    e.persist();
    let Ox, Oy;

    // Stores the mouse origin pos
    document.onmousemove = (event) => {
      Ox = event.pageX;
      Oy = event.pageY;
    };
    // Removes the transform transition
    e.target.style.transition = 'box-shadow 0.4s';
    this.timeout = setInterval(() => {
      // Translates the div to mouse current position
      this.dx = Ox - e.pageX;
      this.dy = Oy - e.pageY;
      e.target.style.transform = `translate(${this.dx}px, ${this.dy}px)`;
      // Toggles styles depending of position
      if (this.dx < -100) {
        e.target.style.backgroundColor = 'red';
      } else if (this.dx > 100) {
        e.target.style.backgroundColor = 'green';
      } else {
        e.target.style.backgroundColor = 'white';
      }
    }, 10);
  };

  onDrop = (e) => {
    e.persist();
    // Brings back the transform transition
    e.target.style.transition = 'box-shadow 0.4s, transform 1s';
    // Toggles actions depending of mouse position on drop
    if (this.dx < -100) {
      //TODO: Dislike the user
      e.target.style.transform = 'translateX(-200vw)';
      // Deletes the div after moving it to left
      setTimeout(() => {
        if (e.target && e.target.parentElement) {
          e.target.parentElement.removeChild(e.target);
        }
      }, 1000);
    } else if (this.dx > 100) {
      //TODO: Like the user
      e.target.style.transform = 'translateX(200vw)';
      // Deletes the div after moving it to right
      setTimeout(() => {
        if (e.target && e.target.parentElement) {
          e.target.parentElement.removeChild(e.target);
        }
      }, 1000);
    } else {
      // Takes div back to original position
      e.target.style.transform = '';
    }
    clearInterval(this.timeout);
  };

  render() {
    return (
      <div className="card" onMouseDown={this.onDrag} onMouseUp={this.onDrop} onMouseLeave={this.onDrop}>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, null)(Card);