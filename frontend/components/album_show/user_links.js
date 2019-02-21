import React from 'react';
import { Link } from 'react-router-dom';

class UserLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  render() {
    return (
      <div className="album-user-links">
        <Link to={`/albums/${this.props.albumId}/edit`} className="album-edit-button">Edit</Link>
      </div>
    );
  }
}

export default UserLinks;