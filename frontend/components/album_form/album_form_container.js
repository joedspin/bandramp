import { connect } from 'react-redux';
import { createAlbum, updateAlbum } from '../../actions/album_actions';
import { AlbumForm } from './album_form';
import { BLANK_ALBUM } from './album_form';

const mapStateToProps = (state, ownProps) => {
  let album = BLANK_ALBUM;
  let formType = 'Save Draft';
  if (ownProps.match.params.albumId) {
    album = ownProps.albums[ownProps.match.params.albumId];
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
  if (ownProps.match.params.albumId) {
    action = (album) => dispatch(updateAlbum(album));
  }
  return {
    action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm);