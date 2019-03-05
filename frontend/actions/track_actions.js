import * as TrackApiUtil from '../util/track_api_util';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const RECEIVE_TRACK_ERRORS = 'RECEIVE_TRACK_ERRORS';
export const DELETE_TRACK = 'DELETE_TRACK';

export const fetchTracks = (albumId) => dispatch => {
  return TrackApiUtil.fetchTracks(albumId).then(tracks =>
    dispatch(
      receiveTracks(tracks)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  );
};

export const fetchTrack = (trackId) => dispatch => {
  return TrackApiUtil.fetchTrack(trackId).then(track => 
    dispatch(
      receiveTrack(track)),
      err => (dispatch(receiveErrors(err.responseJSON)))
    );
};

export const deleteTrack = (trackId) => dispatch => {
  return TrackApiUtil.deleteTrack(trackId).then(() => 
    dispatch(
      removeTrack(trackId)),
      err => (dispatch(receiveErrors(err.responseJSON)))
    );
};

const receiveTrack = (track) => {
  return {
    type: RECEIVE_TRACK,
    track
  };
};

const receiveTracks = (tracks) => {
  return {
    type: RECEIVE_TRACKS,
    tracks
  };
};

const removeTrack = (trackId) => {
  return {
    type: DELETE_TRACK,
    trackId: trackId
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_TRACK_ERRORS,
    errors
  };
};