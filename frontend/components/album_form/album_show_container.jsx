import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAlbum, fetchAlbums } from '../../actions/album_actions';

const mapStateToProps = (state, ownProps) => {
  const albumId = parseInt(ownProps.match.params.albumId);
  const album = state.entities.albums[albumId];
  return {
    albumId,
    album,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAlbum: (albumId) => dispatch(fetchAlbum(albumId)),
    fetchAlbums: () => dispatch(fetchAlbums()),
  }
}

export const AlbumShowForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumShowComponent));