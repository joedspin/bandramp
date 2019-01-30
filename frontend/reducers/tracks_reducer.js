import merge from 'lodash/merge';

import { RECEIVE_ALBUM } from '../actions/album_actions';

const TracksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return merge({}, state, action.tracks);
    default:
      return state;
  }
};

export default TracksReducer;