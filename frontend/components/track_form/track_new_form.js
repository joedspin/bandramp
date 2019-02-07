import React from 'react';
import { BLANK_TRACK } from './track_form';
class TrackNewForm extends React.Component {

  addTrack() {
    let track = merge({}, BLANK_TRACK,
      { track_order: this.props.prevTrackCount + this.props.newTracks + 1 });
    return (e) => {
      this.props.addTrack(track, (this.props.newTracks + 1));
    };
  }

  editTrackAudio(audio_file, audioUrl, audioFile) {
    this.props.editTrack({
      [this.props.newTracks + 1]: {
        audio_file: audio_file,
        audioUrl: audioUrl,
        audioFile: audioFile
      }
    });
  }

  popTrackLoadWindow(e) {
    e.preventDefault();
    let trackLoad = document.getElementById('track-audio-file');
    trackLoad.click();
  }

  handleFile(e) {
    e.preventDefault();
    this.addTrack();
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
      <div className="tracks-add-wrapper">
        <label onClick={this.popTrackLoadWindow} className="tracks-add-button"
          htmlFor="track-audio-file">add track</label>
        <div className="tracks-add-arrow"></div>
        <div className="tracks-add-info">291MB
          <span className="site-color">max </span> per track, lossless
          <span className="site-color">.wav, .aif or .flac </span></div>
        <input type="file" className="track-load-hidden"
          onChange={this.handleFile.bind(this)}
          id="track-audio-file" /> 
      </div>
    );
  }
}

export default TrackNewForm;