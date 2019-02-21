import React from 'react';
import UserHeader from '../auth_form/user_header';
import UserLinks from './user_links';
import { CoverArt, CoverBanner } from './album_show_cover';
import AlbumPlayer from './album_show_player_container';
import { convertDate } from '../../util/album_api_util';

const BLANK_ALBUM = {
  title: '',
  artist_name: '',
  release_date: '',
  description: '',
  upc_ean: '',
  catalog_number: '',
  published: false,
  track_ids: [],
  photoFile: null,
  photoUrl: null,
  photo: null,
};

function privateTag(published) {
  let privateTag = '';
  if (published) {
    privateTag = <p><span className="album-private">private</span></p>
  }
  return privateTag;
}

class AlbumShowComponent extends React.Component {
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
    const bodyEl = document.querySelector('body');
    bodyEl.backgroundColor = "darkgray";
  }

  componentWillUnmount() {
    const bodyEl = document.querySelector('body');
    bodyEl.backgroundColor = "white";
  }

  userLinks() {
    if (this.props.album.administrator_id === this.props.sesionUserId) {
      return <UserLinks albumId />;
    } else {
      return '';
    }
  }

  render() {
    let rDateString;
    if (this.state.release_date.length) {
      rDateString = <p className="album-show-release-date">released {convertDate(this.state.release_date, 3)}</p>;
    } else {
      rDateString = '';
    }
    return (
      <div className="album-page">
        <UserHeader />
        <div className='album-show-container'>
          <CoverBanner photo={this.state.photo} photoUrl={this.state.photoUrl} />
          <div className="album-show-body">
            <div className="album-show-info">
              <p className="album-show-title">{this.state.title}</p>
              <p className="album-show-artist">by {this.state.artist_name}</p>
              {this.userLinks()}
              {privateTag(!this.state.published)}
              <AlbumPlayer trackId={this.state.track_ids[0]} /> 
              {rDateString}
              <p className="album-show-release-date">all rights reserved</p>
            </div>
            <div className="album-show-cover">
              <CoverArt photo={this.state.photo} photoUrl={this.state.photoUrl} />
            </div>
            <div className="album-show-more">
              Additional content
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default AlbumShowComponent;