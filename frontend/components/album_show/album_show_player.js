import React from 'react';

class AlbumPlayerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.audioElement = '';
    this.state = {};
    this.state.progress = 0;
    this.intervalId = setInterval(this.tick, 500);
    this.fetched = false;
  }

  componentDidMount() {
    this.props.fetchTrack(this.props.trackId);
  }

  componentDidUpdate(prevProps) {
      if (prevProps.trackId !== this.props.trackId) {
      this.props.fetchTrack(this.props.trackId).then(() => {
        this.fetched = true;
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick() {
    let playPosition = Math.floor(1000 * this.audioElement.currentTime / this.audioElement.duration);
    if (!isNaN(playPosition) && parseInt(Number(playPosition)) == playPosition &&
        !isNaN(parseInt(playPosition, 10))) {
      this.setState({progress: playPosition});
    }
  }

  render() {
    console.log(this.props.track.title)
    return (
      <div>
        <div className="album-player">
          <button id="album-player-button" className={"album-play-button"} onClick={() => {
            this.audioElement = document.getElementById("album-audio");
            let buttonElement = document.getElementById("album-player-button");
            if (this.audioElement.paused) {
              this.audioElement.play();
              buttonElement.innerHTML = "||";
            } else {
              this.audioElement.pause();
              buttonElement.innerHTML = "▶";
            }
          }}>▶</button>
          <div className="album-player-title">{this.props.track.title} {this.props.track.duration}</div>
          <input className="album-range" type="range" name="progress" min="0" max="1000" value={this.state.progress} 
            onChange={() => {return true}} step="1" />
          <audio id="album-audio" src={this.props.track.audio_file} type="audio/mpeg" />
          <div className="album-player-playbar"><div className="album-player-draggable"></div></div>
        </div>
        <div className="album-feature-block"><div className="album-feature-head">Digital Album</div>
        <div className="album-feature-subhead">Streaming + Download</div>
        <div className="album-feature-info">
          <p>Includes unlimited streaming via the free Bandramp app, plus high-quality download in MP3, FLAC and more.</p>
        </div></div>
      </div>
    );
  }
}

export default AlbumPlayerComponent;