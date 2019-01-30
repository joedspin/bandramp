import { RECEIVE_ALBUM } from '../actions/album_actions';
import { UPDATE_ALBUM } from '../actions/editing_actions';
import { merge } from 'lodash';

const EditingReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return action.album;
    case UPDATE_ALBUM:
      let newState = merge({}, state, action.update);
      return newState;
    default:
      return state;
    }
  };

  export default EditingReducer;