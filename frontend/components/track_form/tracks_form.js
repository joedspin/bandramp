import React from 'react';
// import TrackNewForm from './track_new_form';
import TrackForm from './track_form_container';
import { BLANK_TRACK } from './track_form';
import { merge } from 'lodash';

class TracksForm extends React.Component {

  addTrack() {
    let track = merge({}, BLANK_TRACK, 
      { track_order: this.props.prevTrackCount + this.props.newTracks + 1 });
    return (e) => {
      this.props.addTrack(track, (this.props.newTracks + 1));
    };
  }

  render() {
    let tracks = [];
    Object.values(this.props.tracks).forEach((track) => {
      tracks.push(
        <TrackForm 
          key={track.id}
          track={track} />
      );
    });

    return (
      <div className="tracks-module">
        <h3 className="tracks-section-head">TRACKS</h3>
        {tracks}
        <button onClick={this.addTrack()}>add track</button>
      </div>
    );
  }
}

export default TracksForm;