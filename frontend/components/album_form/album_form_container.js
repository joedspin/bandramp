import { connect } from 'react-redux';
import { createAlbum, updateAlbum, fetchAlbum, fetchAlbums } from '../../actions/album_actions';
import { AlbumForm, BLANK_ALBUM } from './album_form';

const mapStateToProps = (state, ownProps) => {
  let album = BLANK_ALBUM;
  let formType = 'Save Draft';
  if (typeof ownProps.match.params.albumId !== "undefined" &&
      typeof state.albums !== "undefined") {
    album = state.albums[ownProps.match.params.albumId];
    formType = 'Update';
  }
  return {
    errors: state.errors.album,
    album,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let action = (album) => dispatch(createAlbum(album));
  if (typeof ownProps.match.params.albumId !== "undefined") {
    action = (album) => dispatch(updateAlbum(album));
  }
  return {
    fetchAlbum: (albumId) => dispatch(fetchAlbum(albumId)),
    fetchAlbums: () => dispatch(fetchAlbums()),
    action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm);