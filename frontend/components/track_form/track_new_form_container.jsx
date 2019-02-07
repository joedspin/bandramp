import { connect } from 'react-redux';
import { editTrack, addTrack } from '../../actions/editing_actions';
import TrackNewForm from './track_new_form';

const mapStateToProps = (state) => {
  return {
    tracks: state.editing.tracks || {},
    newTracks: state.editing.changes.newTracks || 0,
    prevTrackCount: state.editing.changes.prevTrackCount || 0
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    editTrack: (track) => dispatch(editTrack(track)),
    addTrack: (track, newTrackId) => dispatch(addTrack(track, newTrackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackNewForm);