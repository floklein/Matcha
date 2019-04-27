import React, {Component} from 'react';

import './preview.css';

class Preview extends Component {
  render() {
    return (
      <div className="preview">
        <div className="preview__profile-pic"/>
        <div className="preview__name">John Jujard</div>
        <div className="preview__username">johnjujard</div>
        <div className="preview__infos">
          <div>
            <div>ÂGE</div>
            <div>{'23'}</div>
          </div>
          <div>
            <div>VILLE</div>
            <div>{'Paris'}</div>
          </div>
          <div>
            <div>GENRE</div>
            <div>{'Homme'}</div>
          </div>
          <div>
            <div>SEXUALITÉ</div>
            <div>{'Hétéro'}</div>
          </div>
        </div>
        <button className="preview__button pink"/>
      </div>
    );
  }
}

export default Preview;