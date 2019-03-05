import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../util/album_api_util';

class AlbumItemLink extends React.Component {
  render() {
    let albumTitle ='';
    if (this.props.albumId !== this.props.activeAlbumId) {
      albumTitle = (
        <Link to={`/albums/${this.props.album.id}${this.props.edit}`}>
          {this.props.album.title}
        </Link>
      );
    } else {
      albumTitle = this.props.album.title;
    }
    let privateLabel = '';
    if (!this.props.album.published) {
      privateLabel = (
        <div className="label-private">private</div>
      );
    }
    let thumbImage;
    if (this.props.album.photo) {
      thumbImage = (
        <Link to={`/albums/${this.props.album.id}${this.props.edit}`}>
          <img src={this.props.album.photo} />
          {privateLabel}
        </Link>
      );
    } else {
      thumbImage = (
        <Link to={`/albums/${this.props.album.id}${this.props.edit}`}>
          <img src={this.props.album.photo} />
          {privateLabel}
        </Link>
      );
    }
    return (
      <li className="album-list-thumb">
        {thumbImage}
        <h3 className="album-list-title">
          {albumTitle}<br/>
          by {this.props.album.artist_name}</h3>
        <p>{convertDate(this.props.album.release_date, 2)}</p>
      </li>
    );
  }
}

export default AlbumItemLink;