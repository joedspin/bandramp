import { RECEIVE_ALBUM } from '../actions/album_actions';
import { EDIT_ALBUM } from '../actions/editing_actions';
import { merge } from 'lodash';

const EditingReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return action.album;
    case EDIT_ALBUM:
      return merge({}, state, action.album);
    default:
      return state;
    }
  };

  export default EditingReducer;