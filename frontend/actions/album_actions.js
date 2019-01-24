import * as PostApiUtil from '../util/album_api_util';

export const RECEIVE_ALL_ALBUMS = 'RECEIVE_ALL_ALBUMS';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export const RECEIVE_ALBUM_ERRORS = 'RECEIVE_ALBUM_ERRORS';

export const fetchAlbums = () => dispatch => {
  return PostApiUtil.fetchAlbums().then(albums => 
    dispatch(receiveAllAlbums(albums)));
};

export const fetchAlbum = (id) => dispatch => {
  return PostApiUtil.fetchAlbum(id).then(album => 
    dispatch(receiveAlbum(album)));
};

export const createAlbum = (album) => dispatch => {
  return PostApiUtil.createAlbum(album).then(album => 
    dispatch(
      receiveAlbum(album)),
      err => (dispatch(receiveErrors(err.responseJSON)))
    );
};

export const updateAlbum = (album) => dispatch => {
  return PostApiUtil.updateAlbum(album).then(album => 
    dispatch(
      receiveAlbum(album)),
      err => (dispatch(receiveErrors(err.responseJSON)))
    );
};

const receiveAllAlbums = (albums) => {
  return {
    type: RECEIVE_ALL_ALBUMS,
    albums
  };
};

const receiveAlbum = (album) => {
  return {
    type: RECEIVE_ALBUM,
    album
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ALBUM_ERRORS,
    errors
  };
};