import React from 'react';

class AlbumTrackComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.track;
  }

  componentDidMount() {
    this.props.fetchTrack(this.props.trackId).then(() => {
      this.setState(this.props.track);
    });
  }

  formatTrackNum(num) {
    if (num > 0) {
      if (num < 10) {
        return '0' + num.toString() + '. ';
      } else {
        return num.toString() + '. ';
      }
    }
  }

  render() {
    
    return (
      <div>
        <div className="album-player">
          <button id="album-player-button" className={'album-play-button-small'} onClick={() => {
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
          <div className="album-player-title">{this.formatTrackNum(this.props.trackNum)}
            {this.state.title} {this.state.duration}</div>
          <audio id="album-audio" src={this.state.audio_file} type="audio/mpeg" />
          <div className="album-player-playbar"><div className="album-player-draggable"></div></div>
        </div>
      </div>
    );
  }
}

export default AlbumTrackComponent;