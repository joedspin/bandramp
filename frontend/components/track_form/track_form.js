import React from 'react';

export const BLANK_TRACK = {
  title: '',
  track_order: '',
  release_date: '',
  lyrics: '',
  duration: '',
  album_id: '',
  bonus_track: false,
  trackFile: null,
  trackUrl: null,
  audio_file: null
};

class TrackForm extends React.Component {

  editTrack(trackId, field) {
    return (e) => {
      this.props.editTrack({ [trackId]: { [field]: e.target.value } });
    };
  }

  render() {
    let featureTag;
    let featureDescription = '';
    if (this.props.track.track_order === 1) {
      featureTag = <div className="track-feature-on"></div>
      featureDescription = (
        <div className="track-feature-description">
          <strong>Featured: </strong>
          this is the track that will be cued up when fans visit or embed the&nbsp;
          album, and it's also the track that will play in Discover.
      </div>
      );
    } else {
      featureTag = <div className="track-feature-off"></div>
    }
    return (

      <div className="track-title-menu">
        <div>
          {featureTag}
          <div className="track-order">{this.props.track.track_order}</div>
          <h3 className="track-head">{this.props.track.title || 'Untitled Track'}</h3>
          {featureDescription}
          {this.props.track.duration}
            <div className="input-wrapper">
              <input type="text" value={this.props.track.title}
                onChange={this.editTrack(this.props.track.id, 'title')}
                id="track-form-title" required placeholder='track name' />
            </div>
        </div>
      </div>
    );
  }
}

export default TrackForm;
