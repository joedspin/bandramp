import { connect } from 'react-redux';
import TracksShow from './tracks_show';

const mapStateToProps = (state, ownProps) => {
  let albumId = ownProps.albumId;
  return {
    errors: state.errors.track || [],
    track: state.editing.tracks[ownProps.trackId] || BLANK_TRACK,
    albumId: albumId || 0,
    id: ownProps.trackId || 0
  };
};

export const TrackForm = connect(mapStateToProps)(TracksShow);