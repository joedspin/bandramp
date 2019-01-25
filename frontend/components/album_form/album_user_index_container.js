import AlbumUserList from './album_user_index';
import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions/album_actions';

const mapStateToProps = (state) => {
  const userAlbumIds = state.users[state.session.id].administered_album_ids;
  const userAlbums = [];
  userAlbumIds.forEach ((albumId) => {
    if (state.albums[albumId]) {
      userAlbums.push(state.albums[albumId]);
    }
  });
  return {
    userAlbums    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumUserList);