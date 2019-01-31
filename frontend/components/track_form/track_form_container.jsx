import { connect } from 'react-redux';
import { createTrack, updateTrack } from '../../actions/track_actions';
import { editTrack } from '../../actions/editing_actions';
// import { BLANK_TRACK } from './track_form';
import TrackForm from './track_form';

const mapStateToProps = (state, ownProps) => {
  // let track = BLANK_TRACK;
  let albumId = state.editing.album.id;
  // BLANK_TRACK.album_id = albumId;
  // if (typeof albumId !== "undefined" &&
  //   typeof state.editing.tracks !== "undefined") {
  //   track = state.editing.tracks[ownProps.trackId];
  // }
  return {
    errors: state.errors.track,
    track: ownProps.track,
    albumId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let action = (track) => dispatch(createTrack(track));
  // if (typeof ownProps.match.params.trackId !== "undefined") {
  //   action = (track) => dispatch(updateTrack(track, ownProps.match.params.trackId));
  // }
  return {
    updateTrack: (track) => dispatch(updateTrack(track)),
    editTrack: (track) => dispatch(editTrack(track)),
    action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackForm);