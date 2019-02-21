import * as TrackApiUtil from '../util/track_api_util';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_TRACK_ERRORS = 'RECEIVE_TRACK_ERRORS';
// export const UPDATE_TRACK = 'UPDATE_TRACK';

// export const updateTrack = (track, trackId) => dispatch => {
//   return TrackApiUtil.updateTrack(track, trackId).then(track =>
//     dispatch(
//       receiveTrack(track)),
//     err => (dispatch(receiveErrors(err.responseJSON)))
//   );
// };

export const fetchTrack = (trackId) => dispatch => {
  return TrackApiUtil.fetchTrack(trackId).then(track => 
    dispatch(
      receiveTrack(track)),
      err => (dispatch(receiveErrors(err.responseJSON)))
    );
}

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
