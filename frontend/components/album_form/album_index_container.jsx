import AlbumList from './album_index';
import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions/album_actions';

const mapStateToProps = (state) => {
  const publicAlbums = [];
  Object.keys(state.entities.albums).forEach ((albumId) => {
    if (state.entities.albums[albumId].published && 
      state.entities.albums[albumId].track_ids.length > 0) {
      publicAlbums.push(state.entities.albums[albumId]);
    }
  });
  return {
    publicAlbums
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);