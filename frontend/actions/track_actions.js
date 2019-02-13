import * as PostApiUtil from '../util/track_api_util';

export const RECEIVE_TRACK_ERRORS = 'RECEIVE_TRACK_ERRORS';
export const UPDATE_TRACK = 'UPDATE_TRACK';

export const updateTrack = (track, trackId) => dispatch => {
  return PostApiUtil.updateTrack(track, trackId).then(track =>
    dispatch(
      receiveTrack(track)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  );
};

const receiveTrack = (track) => {
  return {
    type: RECEIVE_TRACK,
    track
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_TRACK_ERRORS,
    errors
  };
};

export const selectPane = (paneId) => {
  return {
    type: SELECT_PANE,
    paneId
  };
};