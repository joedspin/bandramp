import React from 'react';
import { BLANK_TRACK } from './track_form';
import { merge } from 'lodash';

class TrackNewForm extends React.Component {

  addTrack() {
    const newId = this.props.newTracks + 1;
    let track = merge({}, BLANK_TRACK,
      { track_order: this.props.prevTrackCount + newId });
    this.props.addTrack(track, (newId));
    this.props.selectPane(`add${newId}`)

  }

  editTrackAudio(audio_file, audioUrl, audioFile) {
    this.props.editTrack({
      ['add'+(this.props.newTracks)]: {
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
    let trackLoad = document.getElementById('track-audio-file');
    trackLoad.value = '';
  }

  render() {
    return (
      <div className="tracks-add-wrapper">
        <label onClick={() => this.popTrackLoadWindow} className="tracks-add-button"
          htmlFor="track-audio-file">add track</label>
        <div className="tracks-add-arrow"></div>
        <div className="tracks-add-info">291MB&nbsp;
          <span className="site-color">max </span> per track, lossless&nbsp;
          <span className="site-color">.wav, .aif or .flac </span></div>
        <input type="file" className="track-load-hidden"
          onChange={this.handleFile.bind(this)}
          id="track-audio-file" /> 
      </div>
    );
  }
}

export default TrackNewForm;