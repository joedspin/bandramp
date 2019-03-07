import React from 'react';

class AlbumTrackComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.state = props.track;
  }

  componentDidMount() {
    this.props.fetchTrack(this.props.trackId);
  }

  formatTrackNum(num) {
    if (num >= 0) {
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
            this.props.playTrack(this.props.trackNum);
          }}>▶</button>
          <div className="album-player-title">{this.formatTrackNum(this.props.trackNum)}
            {this.props.track.title} {this.props.track.duration}</div>
          <div className="album-player-playbar"><div className="album-player-draggable"></div></div>
        </div>
      </div>
    );
  }
}

export default AlbumTrackComponent;