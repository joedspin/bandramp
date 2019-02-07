
import { connect } from 'react-redux';
import TracksMenu from './tracks_menu';

const mapStateToProps = (state) => {
  return {
    tracks: state.editing.tracks || {},
    newTracks: state.editing.changes.newTracks || 0,
    prevTrackCount: state.editing.changes.prevTrackCount || 0,
    track_ids: state.editing.album.track_ids || []
  };
};

export default connect(mapStateToProps)(TracksMenu);