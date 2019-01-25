import React from 'react';
import { Link } from 'react-router-dom';

class AlbumItemLink extends React.Component {
  render() {
    return (
      <li className="album-thumb">
        <h3>{this.props.album.title}<br/>
        by {this.props.album.artist_name}</h3>
        <p><Link to={`/albums/${this.props.album.id}/edit`}>Edit</Link></p></li>
    )
  }
}

export default AlbumItemLink;