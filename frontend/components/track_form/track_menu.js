import React from 'react';
import { AudioKey } from './audio_key';
import { FeatureKey, FeatureDescription } from './feature_key';

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

class TrackMenu extends React.Component {

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

  asMb(file_size) {
    let mb = Math.ceil(file_size / 1000000);
    return `${mb}mb`;
  }

  render() {
    return (
      <div className="track-title-menu tab-off">
        <div>
          <FeatureKey track_order={this.props.track.track_order} />
          <div className="track-order">{this.props.track.track_order}</div>
          <h3 className="track-head">{this.props.track.title || 'Untitled Track'}</h3>
          <FeatureDescription track_order={this.props.track.track_order} /><br />
          {this.props.track.duration} | {this.asMb(this.props.track.audio_size)}<br />
          <AudioKey track={this.props.track} deleteAudio={this.props.deleteTrackAudio} />
        </div>
        <div style="display: box; width: 50px; height: 50px; border: 1px solid black; box-shadow: 1px 0 black;"></div>
      </div>
    );
  }
}

export default TrackMenu;