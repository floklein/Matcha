import React, {Component} from 'react';

class UserSettings extends Component {
  componentDidMount() {
    document.title = 'Mes préférences';
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
      </div>
    );
  }
}

export default UserSettings;