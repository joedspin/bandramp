import * as PostApiUtil from '../util/track_api_util';

export const RECEIVE_ALL_TRACKS = 'RECEIVE_ALL_TRACKS';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_TRACK_ERRORS = 'RECEIVE_TRACK_ERRORS';

export const fetchTracks = () => dispatch => {
  return PostApiUtil.fetchTracks().then(track =>
    dispatch(receiveAllTracks(track)));
};

export const fetchTrack = (id) => dispatch => {
  return PostApiUtil.fetchTrack(id).then(track =>
    dispatch(receiveTrack(track)));
};

export const createTrack = (track) => dispatch => {
  return PostApiUtil.createTrack(track).then(track =>
    dispatch(
      receiveTrack(track)),
    err => {
      return dispatch(receiveErrors(err.responseJSON));
    }
  );
};

export const updateTrack = (track, trackId) => dispatch => {
  return PostApiUtil.updateTrack(track, trackId).then(track =>
    dispatch(
      receiveTrack(track)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  );
};

const receiveAllTracks = (tracks) => {
  return {
    type: RECEIVE_ALL_TRACKS,
    tracks
  };
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