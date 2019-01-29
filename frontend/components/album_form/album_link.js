import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../util/album_api_util';

class AlbumLink extends React.Component {
  render() {
    let thumbImage;
    if (this.props.album.photo) {
      thumbImage = (
        <div className="album-thumb">
          <img src={this.props.album.photo} />
        </div>
      );
    } else {
      thumbImage = (
        <div className="album-thumb" src={this.props.album.photo}>
        </div>
      );
    }
    return (
      <Link to={`/albums/${this.props.album.id}/edit`}>
        <li className="album-link">
          {thumbImage}
          <h3 className="album-link-title">
          <strong>{this.props.album.title}</strong></h3>
          <p className="album-link-title">by {this.props.album.artist_name}</p>
          <p className="album-link-title">{convertDate(this.props.album.release_date, 3)}</p>
        </li>
      </Link>
    );
  }
}

export default AlbumLink;