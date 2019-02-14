import merge from 'lodash/merge';

import { RECEIVE_ALL_ALBUMS, RECEIVE_ALBUM } from '../actions/album_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const AlbumReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, action.albums);
    case RECEIVE_ALL_ALBUMS:
      return action.albums;
    case RECEIVE_ALBUM:
      return merge({}, state, {[action.album.id]: action.album, selectedPane: 0});
    default:
      return state;
  }
};

export default AlbumReducer;