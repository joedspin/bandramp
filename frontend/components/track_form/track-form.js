import React from 'react';

export const BLANK_TRACK = {
  title: '',
  track_order: ,
  release_date: '',
  lyrics: '',
  duration: '',
  album_id: this.props.match.params.albumId,
  bonus_track: false,
  trackFile: null,
  trackUrl: null,
  audio_file: null
};

class TrackForm extends React.Component {
  render() {
    let featureTag;
    let featureDescription = '';
    if (this.state.track_order === 1) {
      <div className="track-feature-on"></div>
      <div classname="track-feature-description">
        <strong>Featured: </strong>
        this is the track that will be cued up when fans visit or embed the&nbsp;
        album, and it's also the track that will play in Discover.
      </div>
    } else {
      <div classname="track-feature-off"></div>
    }
    return (
      <div className="track-title-menu">
        <div>
          {featureTag}
          <div className="track-order">{this.state.track_order}</div>
          <h3 className="track-head">{this.state.title || 'Untitled Track'}</h3>
          {artistString}
          {rDateString}
          {privateTag}
        </div>
      </div>
    );
  }
}

export default TrackForm;
