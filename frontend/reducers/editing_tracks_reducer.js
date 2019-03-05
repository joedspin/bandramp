import { RECEIVE_ALBUM } from '../actions/album_actions';
import { EDIT_TRACK, ADD_TRACK } from '../actions/editing_actions';
import { CLEAR_FORM } from '../actions/editing_actions';
import { DELETE_TRACK } from '../actions/track_actions';
import { merge } from 'lodash';

const EditingTracksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return merge({}, action.tracks);
    case EDIT_TRACK:
      return merge({}, state, action.track);
    case ADD_TRACK:
      const newTrackId = 'add' + action.newTrackNum;
      let newTrack = merge({}, action.track, { id: newTrackId });
      newTrack = merge({},  { [newTrackId]: newTrack });
      return merge({}, state, newTrack);
    case DELETE_TRACK:
      let newState = merge({}, state);
      delete newState[`${action.trackId}`];
      return newState;
    case CLEAR_FORM:
      return {}
    default:
      return state;
  }
};

export default EditingTracksReducer;