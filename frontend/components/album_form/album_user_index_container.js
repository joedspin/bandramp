import AlbumUserList from './album_user_index';
import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions/album_actions';

const mapStateToProps = (state, ownProps) => {
  debugger
  const activeAlbumId = ownProps.match.params.albumId;
  const userAlbumIds = state.entities.users[state.session.id].administered_album_ids;
  const userAlbums = [];
  userAlbumIds.forEach ((albumId) => {
    if (state.entities.albums[albumId]) {
      userAlbums.push(state.entities.albums[albumId]);
    }
  });
  return {
    userAlbums,
    activeAlbumId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumUserList);