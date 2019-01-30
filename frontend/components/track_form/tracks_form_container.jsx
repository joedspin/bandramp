
import { connect } from 'react-redux';
import { TrackForm, BLANK_TRACK } from './track_form';

const mapStateToProps = (state, ownProps) => {
  const tracks = [];
  if (state.entities.albums[ownProps.match.params.albumId].tracks) {
    tracks = state.entities.albums[ownProps.match.params.albumId].tracks;
  }
  return {
    tracks
  };
};


export default connect(mapStateToProps)(TrackForm);