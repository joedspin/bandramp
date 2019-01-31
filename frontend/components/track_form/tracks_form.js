import React from 'react';
import TrackNewForm from './track_new_form';
import TrackForm from './track_form_container';

class TracksForm extends React.Component {

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
        <TrackNewForm />
      </div>
    );
  }
}

export default TracksForm;