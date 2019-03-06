import { RECEIVE_ALBUM } from '../actions/album_actions';
import { EDIT_ALBUM } from '../actions/editing_actions';
import { EDIT_TRACK } from '../actions/editing_actions';
import { ADD_TRACK } from '../actions/editing_actions';
import { CLEAR_FORM } from '../actions/editing_actions';
import { DELETE_TRACK } from '../actions/track_actions';
import { merge } from 'lodash';

const EditingReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  let prevTrackCount;
  switch (action.type) {
    case RECEIVE_ALBUM:
      prevTrackCount = action.album.track_ids.length || 0;
      return {
        albumChanged: false, 
        tracksChanged: [], 
        newTracks: 0,
        prevTrackCount: prevTrackCount
      };
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
    case ADD_TRACK:
      newState = Object.assign({}, newState, {newTracks: action.newTrackNum});
      return newState;
    case DELETE_TRACK:
      prevTrackCount = state.prevTrackCount - 1;
      return merge({}, newState, { prevTrackCount: prevTrackCount });
    case CLEAR_FORM:
      return {albumChanged: false, tracksChanged: [], 
        newTracks: 0, prevTrackCount: 0}
    default:
      return state;
  }
};

export default EditingReducer;