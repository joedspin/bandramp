import { connect } from 'react-redux';
import { updateTrack } from '../../actions/track_actions';
import { editTrack } from '../../actions/editing_actions';
import TrackForm from './track_form';
import TrackMenu from './track_menu';

const mapStateToProps = (state, ownProps) => {
  let albumId = state.editing.album.id;
  return {
    errors: state.errors.track,
    track: ownProps.track,
    albumId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateTrack: (track) => dispatch(updateTrack(track)),
    editTrack: (track) => dispatch(editTrack(track))
  };
};

export const TrackForm = connect(mapStateToProps, mapDispatchToProps)(TrackForm);
export const TrackMenu = connect(mapStateToProps, null)(TrackMenu);