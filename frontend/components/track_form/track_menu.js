import React from 'react';

export const BLANK_TRACK = {
  title: '',
  track_order: '',
  release_date: '',
  lyrics: '',
  duration: '',
  album_id: ``,
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

  editTrackAudio(audio_file, audioUrl, audioFile) {
    this.props.editTrack({
      [this.props.track.id]: {
        audio_file: audio_file,
        audioUrl: audioUrl,
        audioFile: audioFile
      }
    });
  }

  handleFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.editTrackAudio(
        fileReader.result,
        fileReader.result,
        file);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    let featureTag;
    let featureDescription = '';
    let featureClass = 'track-title-input';
    if (this.props.track.track_order === 1) {
      featureTag = <div className="track-feature-on"></div>
      featureDescription = (
        <div className="track-feature-description">
          <strong>Featured: </strong>
          this is the track that will be cued up when fans visit or embed the&nbsp;
          album, and it's also the track that will play in Discover.
      </div>
      );
      featureClass = 'track-title-input feature-class';
    } else {
      featureTag = <div className="track-feature-off"></div>
    }

    let audioFile;
    if (this.props.track.audioUrl) {
      audioFile = (
        <div className="audio-file">track ready to load</div>
      );
    } else if (this.props.track.audio_file) {
      audioFile = (
        <div className="audio-file">{this.props.track.audio_file.size}
          track loaded
          {/* <button onClick={this.deleteCoverArt.bind(this)} className="delete">X</button> */}
        </div>
      );
    } else {

      audioFile = (
        <div>nope</div>
      );
    }

    return (

      <div className="track-title-menu tab-off">
        <div>
          {featureTag}
          <div className="track-order">{this.props.track.track_order}</div>
          <h3 className="track-head">{this.props.track.title || 'Untitled Track'}</h3>
          {featureDescription}
          {this.props.track.duration}
          <div className="input-wrapper track-title">
            <input className={featureClass} type="text" value={this.props.track.title}
              onChange={this.editTrack(this.props.track.id, 'title')}
              id="track-form-title" required placeholder='track name' />
          </div>
          {audioFile}
        </div>
      </div>
    );
  }
}

export default TrackForm;