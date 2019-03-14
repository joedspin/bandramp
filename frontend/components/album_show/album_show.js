import React from 'react';
import UserHeader from '../auth_form/user_header';
import UserLinks from './user_links';
import { CoverArt, CoverBanner } from './album_show_cover';
import { AlbumPlayer, AlbumTrack } from './album_show_player_container';
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
    this.state = {};
    this.state.playingTrack = 0;
    this.state.autoPlay = false;
    this.playTrack = this.playTrack.bind(this);
  }

  componentDidMount() {
    this.props.fetchAlbums();
    if (typeof this.props.albumId !== "undefined") {
      this.props.fetchAlbum(this.props.albumId);
    }
  }

  userLinks() {
    if (this.props.album.administrator_id === this.props.sessionUserId) {
      return <UserLinks albumId={this.props.albumId} />;
    } else {
      return '';
    }
  }

  playTrack(trackIndex) {
    this.setState({playingTrack: trackIndex - 1, autoPlay: true});
  }

  render() {
    let rDateString = '';
    if (this.props.album.release_date.length) {
      rDateString = <p className="album-show-release-date">released {convertDate(this.props.album.release_date, 3)}</p>;
    }
    let tracks = [];
    let trackCount = 0;
    this.props.album.track_ids.forEach((trackId) => {
      trackCount += 1;
      tracks.push(
        <AlbumTrack key={trackId} 
        trackId={trackId} 
        buttonSize='small' 
        trackNum={trackCount} 
        playTrack={this.playTrack} /> 
      );
    });
    return (
      <div className="album-page">
        <UserHeader />
        <div className='album-show-container'>
          <CoverBanner photo={this.props.album.photo} photoUrl={this.props.album.photoUrl} />
          <div className="album-show-body">
            <div className="album-show-info">
              <p className="album-show-title">{this.props.album.title}</p>
              <p className="album-show-artist">by {this.props.album.artist_name}</p>
              {this.userLinks()}
              {privateTag(!this.props.album.published)}
              <AlbumPlayer trackId={this.props.album.track_ids[this.state.playingTrack]} 
                autoPlay={this.state.autoPlay} /> 
              {tracks}
              {rDateString}
              <p className="album-show-release-date">all rights reserved</p>
            </div>
            <div className="album-show-cover">
              <CoverArt photo={this.props.album.photo} photoUrl={this.props.album.photoUrl} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumShowComponent;