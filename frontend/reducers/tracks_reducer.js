import merge from 'lodash/merge';

import { RECEIVE_ALBUM } from '../actions/album_actions';
import { ADD_TRACK } from '../actions/editing_actions';

const TracksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return merge({}, state, action.tracks);
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