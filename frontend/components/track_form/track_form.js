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
      e.preventDefault();
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

  deleteTrackAudio(e) {
    e.preventDefault();
    this.editTrackAudio('delete', '', '');
    const formData = this.fillFormData(true);
    if (this.state.formType === 'Update') {
      this.props.action(formData).then(() => { this.editTrack({ audio_file: '' }); });
    }
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
    return (
      <div className="track-title-menu tab-off">
        <div>
          <div className="input-wrapper track-title">
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
        </div>
      </div>
    );
  }
}

export default TrackForm;