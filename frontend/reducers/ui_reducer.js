import { RECEIVE_ALBUM } from '../actions/album_actions';
import { CLEAR_CREATED_ALBUM_ID } from '../actions/ui_actions';

const UiReducer = (state = { createdAlbumId: null }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return { createdAlbumId: action.album.id,
        editingAlbum: action.album,
        albumChanged: false,
        tracksChanged: [] };
    case CLEAR_CREATED_ALBUM_ID:
      return { createdAlbumId: null };
    default:
      return state;
  }
};

export default UiReducer;