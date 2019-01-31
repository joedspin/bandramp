import { RECEIVE_ALBUM } from '../actions/album_actions';
import { EDIT_ALBUM } from '../actions/editing_actions';
import { EDIT_TRACK } from '../actions/editing_actions';
import { merge } from 'lodash';

const EditingReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return {albumChanged: false, tracksChanged: []}
    case EDIT_ALBUM:
      newState = Object.assign({}, newState, { albumChanged: true });
      return newState;
    case EDIT_TRACK:
      if (newState.tracksChanged.includes(action.trackId)) {
        return state;
      } else {
        newState.tracksChanged.push(action.trackId);
        return newState;
      }
    default:
      return state;
  }
};

export default EditingReducer;