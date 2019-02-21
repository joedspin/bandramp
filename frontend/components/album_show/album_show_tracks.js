import React from 'react';

class AlbumShowTracks extends React.Component {
  constructor(props) {
    super(props);
    this.albumId = props.albumId;
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchTracks(this.albumId).then((tracks) => {
      this.setState(tracks);
    });
  }

  render() {
    const tracksState = this.state.tracks || [];
    const tracks = [].forEach((track) => {
      return (
        <div className="album-player-track">
          <button>Play</button> {track.title} {track.duration}
        </div>
      );
    })
    return (
      <div className="album_tracks">
        {tracks}
      </div>
    );
  }
}

export default AlbumShowTracks;