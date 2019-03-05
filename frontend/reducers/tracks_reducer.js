import { merge } from 'lodash';
import { RECEIVE_TRACK, RECEIVE_TRACKS, DELETE_TRACK } from '../actions/track_actions';
import { RECEIVE_ALBUM } from '../actions/album_actions';
import { ADD_TRACK } from '../actions/editing_actions';

const TracksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACK:
      return merge({}, state, action.track);
    case RECEIVE_TRACKS:
      return merge({}, state, action.tracks);
    case RECEIVE_ALBUM:
      return merge({}, state, action.tracks);
    case DELETE_TRACK:
      let newState = Object.assign({}, state);
      delete newState[action.trackId];
      return newState;
    case ADD_TRACK:
      const newTrackId = 'add' + action.newTrackNum;
      let newTrack = merge({}, action.track, { id: newTrackId });
      newTrack = merge({}, { [newTrackId]: newTrack });
      return merge({}, state, newTrack);
    default:
      return state;
  }
};

export default TracksReducer;