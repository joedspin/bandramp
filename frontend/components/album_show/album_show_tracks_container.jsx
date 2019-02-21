import { connect } from 'react-redux';
import AlbumShowTracks from './album_show_tracks';
import { fetchTracks } from '../../actions/track_actions';

const mapStateToProps = (state, ownProps) => {
  const trackIds = ownProps.trackIds || [];
  const tracks = trackIds.forEach((trackId) => {
    return (
      state.entities.tracks[trackId]
    );
  });
  return {
    tracks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTracks: (albumId) => dispatch(fetchTracks(albumId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumShowTracks);