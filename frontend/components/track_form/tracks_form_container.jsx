
import { connect } from 'react-redux';
import TracksForm from './tracks_form';
import { addTrack } from '../../actions/editing_actions';

const mapStateToProps = (state) => {
  return {
    tracks: state.editing.tracks || {},
    newTracks: state.editing.changes.newTracks || 0,
    prevTrackCount: state.editing.changes.prevTrackCount || 0,
    track_ids: state.editing.album.track_ids || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTrack: (track, newTrackId) => dispatch(addTrack(track, newTrackId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksForm);