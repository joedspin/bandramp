import { connect } from 'react-redux';
import { updateTrack } from '../../actions/track_actions';
import { editTrack } from '../../actions/editing_actions';
import TrackFormComponent from './track_form';
import TrackMenuComponent from './track_menu';

const mapStateToProps = (state, ownProps) => {
  let albumId = state.editing.album.id;
  return {
    errors: state.errors.track,
    track: state.entities.tracks[ownProps.trackId],
    albumId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateTrack: (track) => dispatch(updateTrack(track)),
    editTrack: (track) => dispatch(editTrack(track))
  };
};

export const TrackForm = connect(mapStateToProps, mapDispatchToProps)(TrackFormComponent);
export const TrackMenu = connect(mapStateToProps)(TrackMenuComponent);