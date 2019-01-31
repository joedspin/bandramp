import { RECEIVE_ALBUM } from '../actions/album_actions';
import { EDIT_TRACK } from '../actions/editing_actions';
import { merge } from 'lodash';

const EditingTracksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return action.tracks;
    case EDIT_TRACK:
      return merge({}, state, action.track);
    default:
      return state;
  }
};

export default EditingTracksReducer;