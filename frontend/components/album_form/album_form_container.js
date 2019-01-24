import { connect } from 'react-redux';
import { createAlbum, updateAlbum } from '../../actions/album_actions';
import AlbumForm from './album_form';

const mapStateToProps = (state, ownProps) => {
  const defaultAlbum = {
    title: '',
    titlePlaceholder: 'Untitled Album',
    artistName: '',
    releaseDate: '',
    description: '',
    upc_ean: '',
    catalog_number: '',
    administrator_id: session.current_user.id,
    published: false
  };
  return {
    album: ownProps.albums[this.props.match.params.albumId] || defaultAlbum
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createAlbum: (album) => dispatch(createAlbum(album)),
    updateAlbum: (album) => dispatch(updateAlbum(album))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm);