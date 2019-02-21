import { connect } from 'react-redux';
import AlbumPlayer from './album_show_player';
import { BLANK_TRACK } from '../track_form/track_form';
import { fetchTrack } from '../../actions/track_actions';

const mapStateToProps = (state, ownProps) => {
  const trackId = ownProps.trackId || 0;
  const track = state.entities.tracks[trackId] || BLANK_TRACK;
  return {
    track
  };
 };

const mapDispatchToProps = dispatch => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPlayer);