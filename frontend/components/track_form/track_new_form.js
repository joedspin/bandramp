import React from 'react';
import { BLANK_TRACK } from './track_form';
class TrackNewForm extends React.Component {

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

  addTrack() {
    const maxNew = 
  }

  render() {
    return (
      <div className="input-wrapper">
        {/* <label className="track-add-label" htmlFor="track-audio-file">add track</label>
        <input type="file"
          onChange={this.handleFile.bind(this)}
          id="track-audio-file" /> <span className="track-add-info">291MB 
          <span className="track-add-color">max</span> per track, lossless 
          <span className="track-add-color">.wav, .aif or .flac</span></span> */}
          <button onClick={this.addTrack}>add track</button>
      </div>
    );
  }
}

export default TrackNewForm;