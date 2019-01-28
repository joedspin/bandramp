import React from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../util/album_api_util';

class AlbumItemLink extends React.Component {
  render() {
    let thumbImage;
    if (this.props.album.photo) {
      thumbImage = (
        <Link to={`/albums/${this.props.album.id}/edit`}><img className="album-list-thumb" src={this.props.album.photo} /></Link>
      );
    } else {
      thumbImage = (
        <Link to={`/albums/${this.props.album.id}/edit`}><div className="album-list-thumb" src={this.props.album.photo}></div></Link>
      );
    }
    return (
      <li className="album-thumb">
        {thumbImage}
        <h3 className="album-thumb-title"><Link to={`/albums/${this.props.album.id}/edit`}>{this.props.album.title}</Link><br/>
        by {this.props.album.artist_name}</h3>
        <p>{convertDate(this.props.album.release_date, 2)}</p></li>
    )
  }
}

export default AlbumItemLink;