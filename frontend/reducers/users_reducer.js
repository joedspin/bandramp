import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ALBUM } from '../actions/album_actions';
import { merge } from 'lodash';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.user.id]: action.user});
    case RECEIVE_ALBUM:
      let userAlbumIds = state[Object.keys(state)[0]].administered_album_ids;
      if (userAlbumIds.includes(action.album.id)) {
        return state;
      }
      return merge({}, state, 
          { administered_album_ids: userAlbumIds.push(action.album.id)});
    default:
      return state;
  }
};

export default UsersReducer;