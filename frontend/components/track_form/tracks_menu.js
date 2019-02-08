import React from 'react';
import { TrackMenu } from './track_form_container';
import TrackNewForm from './track_new_form_container';

class TracksMenu extends React.Component {

  render() {
    let tracks = [];
    let track;
    this.props.track_ids.forEach((trackId) => {
      track = this.props.tracks[trackId];
      tracks.push(
        <TrackMenu
          key={track.id}
          track={track} />
      );
    });

    return (
      <div className="tracks-module">
        <h3 className="tracks-section-head">TRACKS</h3>
        {tracks}
        <TrackNewForm />
      </div>
    );
  }
}

export default TracksMenu;