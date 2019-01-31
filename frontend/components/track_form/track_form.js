import React from 'react';

export const BLANK_TRACK = {
  title: '',
  track_order: '',
  release_date: '',
  lyrics: '',
  duration: '',
  album_id: '',
  bonus_track: false,
  trackFile: null,
  trackUrl: null,
  audio_file: null
};

class TrackForm extends React.Component {

  editTrack(trackId, field) {
    return (e) => {
      this.props.editTrack({ [trackId]: { [field]: e.target.value } });
    };
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ audioFile: file, audioUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    let featureTag;
    let featureDescription = '';
    if (this.props.track.track_order === 1) {
      featureTag = <div className="track-feature-on"></div>
      featureDescription = (
        <div className="track-feature-description">
          <strong>Featured: </strong>
          this is the track that will be cued up when fans visit or embed the&nbsp;
          album, and it's also the track that will play in Discover.
      </div>
      );
    } else {
      featureTag = <div className="track-feature-off"></div>
    }

    let audioFile;
    if (this.props.track.audioUrl) {
      audioFile = (
        <div className="album-image-thumb">{this.props.track.audioUrl}</div>
      );
    } else if (this.props.track.audio_file) {
      audioFile = (
        <div className="album-image-thumb">{this.props.track.audio_file}
          {/* <button onClick={this.deleteCoverArt.bind(this)} className="delete">X</button> */}
        </div>
      );
    } else {
      audioFile = (
        <div className="input-wrapper">
          <label htmlFor="album-cover-art">cover art:</label>
          <input type="file"
            onChange={this.handleFile.bind(this)}
            id="album-cover-art" />
        </div>
      );
    }

    return (

      <div className="track-title-menu">
        <div>
          {featureTag}
          <div className="track-order">{this.props.track.track_order}</div>
          <h3 className="track-head">{this.props.track.title || 'Untitled Track'}</h3>
          {featureDescription}
          {this.props.track.duration}
          <div className="input-wrapper">
            <input type="text" value={this.props.track.title}
              onChange={this.editTrack(this.props.track.id, 'title')}
              id="track-form-title" required placeholder='track name' />
          </div>
          <div className="input-wrapper">
            <label className="album-form-label" htmlFor="track-form-duration">duration:</label>
            <input type="text" value={this.props.track.duration}
              onChange={this.editTrack(this.props.track.id, 'duration')}
              id="track-form-duration" />
          </div>
          <div className="input-wrapper with-textarea">
            <label className="album-form-label" htmlFor="album-form-description">lyrics:</label>
            <textarea className="album-textarea"
              value={this.props.track.lyrics}
              onChange={this.editTrack(this.props.track.id, 'lyrics')}
              placeholder="(optional)"
              id="album-form-description" rows="6" />
          </div>
          {audioFile}
        </div>
      </div>
    );
  }
}

export default TrackForm;
