import { connect } from 'react-redux';
import { fetchAlbum, fetchAlbums } from '../../actions/album_actions';
import { AlbumAdminShow } from './album_admin_show';

const mapStateToProps = (state, ownProps, prevProps) => {
  return {
    entities: { album: editingAlbum, tracks: editingTracks}
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let action = (editing) => dispatch(createAlbumAndTracks(editing));
  const albumId = ownProps.match.params.albumId;
  if (typeof albumId !== "undefined") {
    action = (editing) => dispatch(updateAlbumAndTracks(editing, albumId));
  }
  return {
    fetchAlbum: (albumId) => dispatch(fetchAlbum(albumId)),
    fetchAlbums: () => dispatch(fetchAlbums()),
    editAlbum: (album) => dispatch(editAlbum(album)),
    editTrack: (track) => dispatch(editTrack(track)),
    clearCreatedAlbumId: () => dispatch(clearCreatedAlbumId()),
    clearForm: () => dispatch(clearForm()),
    action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm);