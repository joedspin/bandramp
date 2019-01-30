import { connect } from 'react-redux';
import { createTrack, updateTrack, fetchTrack, fetchTracks } from '../../actions/tracks_actions';
import { TrackForm, BLANK_TRACK } from './track_form';

const mapStateToProps = (state, ownProps) => {
  let album = BLANK_TRACK;
  let formType = 'Save Draft';
  if (typeof ownProps.match.params.trackId !== "undefined" &&
    typeof state.entities.tracks !== "undefined") {
    album = state.entities.tracks[ownProps.match.params.trackId];
    // formType = 'Update';
  }
  return {
    errors: state.errors.track,
    track,
    formType,
    createdAlbumId: state.ui.createdAlbumId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let action = (track) => dispatch(createTrack(track));
  if (typeof ownProps.match.params.trackId !== "undefined") {
    action = (track) => dispatch(updateTrack(track, ownProps.match.params.trackId));
  }
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId)),
    fetchTracks: () => dispatch(fetchTracks()),
    // clearCreatedAlbumId: () => dispatch(clearCreatedAlbumId()),
    action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackForm);