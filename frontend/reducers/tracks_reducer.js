import merge from 'lodash/merge';

import {
  RECEIVE_ALL_TRACKS,
  RECEIVE_TRACK
} from '../actions/track_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const TrackReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, action.tracks);
    case RECEIVE_ALL_TRACKS:
      return action.tracks;
    case RECEIVE_TRACK:
      return merge({}, state, {[action.track.id]: action.track});
    default:
      return state;
  }
};

export default TrackReducer;