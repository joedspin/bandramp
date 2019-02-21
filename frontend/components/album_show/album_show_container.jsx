import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAlbum, fetchAlbums } from '../../actions/album_actions';
import AlbumShowComponent from './album_show';

const BLANK_ALBUM = {
  title: '',
  artist_name: '',
  release_date: '',
  description: '',
  upc_ean: '',
  catalog_number: '',
  published: false,
  track_ids: [],
  photoFile: null,
  photoUrl: null,
  photo: null
};

const mapStateToProps = (state, ownProps) => {
  const albumId = parseInt(ownProps.match.params.albumId) || 0;
  const album = state.entities.albums[albumId] || BLANK_ALBUM;
  const sessionUserId = state.session.id;
  return {
    albumId,
    album,
    sessionUserId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAlbum: (albumId) => dispatch(fetchAlbum(albumId)),
    fetchAlbums: () => dispatch(fetchAlbums()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumShowComponent));