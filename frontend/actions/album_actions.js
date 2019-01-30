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
      err => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
};

export const updateAlbum = (album, albumId) => dispatch => {
  return PostApiUtil.updateAlbum(album, albumId).then(album => 
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

const receiveAlbum = ({album, tracks}) => {
  debugger
  return {
    type: RECEIVE_ALBUM,
    album,
    tracks
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ALBUM_ERRORS,
    errors
  };
};