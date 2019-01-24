import { connect } from 'react-redux';
import { createAlbum, updateAlbum } from '../../actions/album_actions';
import AlbumForm from './album_form';

const mapStateToProps = (state, ownProps) => {
  let album = {
    title: '',
    titleDisplay: 'Untitled Album',
    artistName: '',
    releaseDate: '',
    description: '',
    upcEan: '',
    catalog_Number: '',
    published: false,
    administratorId: store.getState().session.id
  };
  let formType = 'Save Draft';
  if (ownProps.match.params.albumId) {
    album = ownProps.albums[ownProps.match.params.albumId];
    formType = 'Update';
  }
  return {
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