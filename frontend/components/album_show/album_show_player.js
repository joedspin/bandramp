import React from 'react';

class AlbumPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.track;
  }

  componentDidMount() {
    this.props.fetchTrack(this.props.trackId).then(() => {
      this.setState(this.props.track);
    });
  }

  render() {
    let buttonSize = '';
    let featuredText = '';
    if (this.props.buttonSize === 'small') {
      buttonSize = '-small';
    } else {
      featuredText = (<div className="album-feature-block"><div className="album-feature-head">Digital Album</div>
        <div className="album-feature-subhead">Streaming + Download</div>
        <div className="album-feature-info">
        <p>Includes unlimited streaming via the free Bandramp app, plus high-quality download in MP3, FLAC and more.</p>
        <p>Download all the currently available Vintage Schatrax White and Grey series. Plus unavailable exclusives. 38 tracks and counting...</p>
        </div></div>);
    }
    if (true) {
      return (
        <div>
          <div className="album-player">
            <button id="album-player-button" className={`album-play-button${buttonSize}`} onClick={() => {
              let audioElement = document.getElementById("album-audio");
              let buttonElement = document.getElementById("album-player-button");
              if (audioElement.paused) {
                audioElement.play();
                buttonElement.innerHTML = "||";
              } else {
                audioElement.pause();
                buttonElement.innerHTML = "▶";
              }
            }}>▶</button>
            <div className="album-player-title">{this.state.title} {this.state.duration}</div>
            <audio id="album-audio" src={this.state.audio_file} type="audio/mpeg" />
            <div className="album-player-playbar"><div className="album-player-draggable"></div></div>
          </div>
          {featuredText}
        </div>
      );
    } else {
      return <div className="album-player-title">{this.state.title} {this.state.duration}</div>
    }
  }
}

export default AlbumPlayer;