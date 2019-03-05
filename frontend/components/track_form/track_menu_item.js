import React from 'react';
import AudioKey from './audio_key';
import { FeatureKey, FeatureDescription } from './feature_key';

class TrackMenu extends React.Component {
  constructor(props) {
    super(props)
    this.deleteTrackAudio = this.deleteTrackAudio.bind(this);
  }

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

  deleteTrackAudio() {
    // e.preventDefault();
    // this.editTrackAudio('delete', '', '');
    // const formData = this.fillFormData(true);
    // if (this.state.formType === 'Update') {
    //   this.props.action(formData).then(() => { this.editTrack({ audio_file: '' }); });
    // }
    this.props.deleteTrack(this.props.id);
  }

  popTrackLoadWindow(trackId) {
    let trackLoad = document.getElementById(`track-audio-file-${trackId}`);
    if (trackLoad) trackLoad.click();
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

  fileDetails() {
    if (this.props.track.filename) {
      return (
        <p className="track-file-details">{this.props.track.filename} 
          {this.props.track.duration} {this.asMb(this.props.track.audio_size)}
          <span className="track-file-replace"><label onClick={() => this.popTrackLoadWindow(this.props.track.id)} 
          className="tracks-replace-button"
            htmlFor={`track-audio-file-${this.props.track.id}`}>replace</label></span>
            <input type="file" className="track-load-hidden" onClick={this.handleFile.bind(this)}
              id={`track-audio-file-${this.props.track.id}`} /></p>
      );
    }
  }

  render() {
    let tabSelected;
    this.props.selectedPane === this.props.track.id ? tabSelected = ' tab-on' : tabSelected = ' tab-off';
    return (
      <div id={`tm${this.props.id}`} className={`track-title-menu${tabSelected}`} onClick={()=>this.props.selectPane(this.props.id)}>
        <div>
          <FeatureKey track_order={this.props.track.track_order} />
          <div className="track-order">{this.props.track.track_order}</div>
          <h3 className="track-head">{this.props.track.title || 'Untitled Track'}</h3>
          <FeatureDescription track_order={this.props.track.track_order} />
          {this.fileDetails()}
          
          <button onClick={() => this.deleteTrackAudio(this.props.track.id)} className="delete-audio">X</button>
        </div>
      </div>
    );
  }
}
// <AudioKey track={this.props.track} />
export default TrackMenu;