import { connect } from 'react-redux';
import AlbumPlayerComponent from './album_show_player';
import AlbumTrackComponent from './album_show_track';
import { BLANK_TRACK } from '../track_form/track_form';
import { fetchTrack } from '../../actions/track_actions';

const mapStateToProps = (state, ownProps) => {
  const trackId = ownProps.trackId || 0;
  const track = state.entities.tracks[trackId] || BLANK_TRACK;
  return {
    track,
    trackId: trackId
  };
 };

const mapDispatchToProps = dispatch => {
  return {
    fetchTrack: (trackId) => dispatch(fetchTrack(trackId))
  };
};

export const AlbumPlayer = connect(mapStateToProps, mapDispatchToProps)(AlbumPlayerComponent);
export const AlbumTrack = connect(mapStateToProps, mapDispatchToProps)(AlbumTrackComponent);