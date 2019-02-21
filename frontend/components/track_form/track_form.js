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

class TrackFormComponent extends React.Component {

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
    let rectTop = 0;
    let rect = document.getElementById(`tm${this.props.id}`);
    if (rect) rectTop = rect.getBoundingClientRect().top;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return (
      <div style={{ marginTop: `${rectTop + scrollTop - 40}px` }}>
        <div>
          <div>
            <input type="text" value={this.props.track.title}
              onChange={this.editTrack(this.props.id, 'title').bind(this)}
              className="track-form-title" required placeholder="track name" />
          </div>
          <div className="album-rule"></div>
          <div className="input-wrapper">
            <label className="album-form-label" htmlFor="track-form-duration">duration:</label>
            <input type="text" value={this.props.track.duration}
              onChange={this.editTrack(this.props.id, 'duration').bind(this)}
              id="track-form-duration" />
          </div>
          <div className="input-wrapper with-textarea">
            <label className="album-form-label" htmlFor="album-form-description">lyrics:</label>
            <textarea className="album-textarea"
              value={this.props.track.lyrics}
              onChange={this.editTrack(this.props.id, 'lyrics').bind(this)}
              placeholder="(optional)"
              id="album-form-description" rows="6" />
          </div>
        </div>
      </div>
    );
  }
}

export default TrackFormComponent;