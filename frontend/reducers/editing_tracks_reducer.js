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
      let tempState = Object.assign({}, state);
      delete tempState[action.trackId];
      let newState = {};
      let trackCount = 1;
      Object.entries(tempState).forEach((track) => {
        let key = track[0];
        let value = track[1];
        value.track_order = trackCount;
        trackCount += 1;
        newState = merge({}, newState, { [key]: value });
      });
      return newState;
    case CLEAR_FORM:
      return {};
    default:
      return state;
  }
};

export default EditingTracksReducer;