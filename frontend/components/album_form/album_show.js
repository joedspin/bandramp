import React from 'react';
import { BLANK_ALBUM, privateTag } from './album_form';
import UserHeader from '../auth_form/user_header';
import { AlbumData, CoverThumb } from './album_form_container';
import AlbumUserIndex from './album_user_index_container';
import { convertDate } from '../../util/album_api_util';
import TracksMenu from '../track_form/tracks_menu_container';
import { TrackForm } from '../track_form/track_form_container';
import { merge } from 'lodash';

class AlbumFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.album || BLANK_ALBUM;
  }

  componentDidMount() {
    this.props.fetchAlbums();
    if (typeof this.props.albumId !== "undefined") {
      this.props.fetchAlbum(this.props.albumId)
        .then(() => {
          this.setState(this.props.album);
        });
    }
  }

  render() {
    return (
      <div className="album-page">
        <UserHeader theme="dark" />
        <div className='album-form-container'>
          <div className="album-info-column">
            <p>{this.props.state.album.title}</p>
            <p>{this.props.state.album.artist}</p>
            <p>{privateTag(!this.getAlbum().published)}</p>
            <p>EDIT DELETE</p>
            <
          </div>
          <div className="album-cover-column">

          </div>
          <div className="user-albums-column">
          
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumFormComponent;