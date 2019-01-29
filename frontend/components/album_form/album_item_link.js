import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../util/album_api_util';

class AlbumItemLink extends React.Component {
  render() {
    let privateLabel = '';
    if (!this.props.album.published) {
      privateLabel = (
        <div className="label-private">private</div>
      );
    }
    let thumbImage;
    if (this.props.album.photo) {
      thumbImage = (
        <Link to={`/albums/${this.props.album.id}/edit`}>
          <div className="album-list-thumb">
            <img src={this.props.album.photo} />
            {privateLabel}
          </div>
        </Link>
      );
    } else {
      thumbImage = (
        <Link to={`/albums/${this.props.album.id}/edit`}>
          <div className="album-list-thumb" src={this.props.album.photo}>
            {privateLabel}
          </div>
        </Link>
      );
    }
    return (
      <li className="album-list-thumb">
        {thumbImage}
        <h3 className="album-list-title">
          <Link to={`/albums/${this.props.album.id}/edit`}>
            {this.props.album.title}
          </Link><br/>
          by {this.props.album.artist_name}</h3>
        <p>{convertDate(this.props.album.release_date, 2)}</p>
      </li>
    );
  }
}

export default AlbumItemLink;