import { connect } from 'react-redux';
import { updateTrack } from '../../actions/track_actions';
import { editTrack } from '../../actions/editing_actions';
import TrackFormComponent, { BLANK_TRACK }  from './track_form';
import TrackMenuComponent from './track_menu_item';

const mapStateToProps = (state, ownProps) => {
  let albumId = state.editing.album.id;
  return {
    errors: state.errors.track || [],
    track: state.editing.tracks[ownProps.trackId] || BLANK_TRACK,
    albumId: albumId || 0,
    id: ownProps.trackId || 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrack: (track) => dispatch(updateTrack(track)),
    editTrack: (track) => dispatch(editTrack(track))
  };
};

export const TrackForm = connect(mapStateToProps, mapDispatchToProps)(TrackFormComponent);
export const TrackMenu = connect(mapStateToProps, mapDispatchToProps)(TrackMenuComponent);