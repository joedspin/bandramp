import * as AlbumApiUtil from '../util/album_api_util';

export const RECEIVE_ALL_ALBUMS = 'RECEIVE_ALL_ALBUMS';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export const RECEIVE_ALBUM_ERRORS = 'RECEIVE_ALBUM_ERRORS';

export const fetchAlbums = () => dispatch => {
  return AlbumApiUtil.fetchAlbums().then(albums => 
    dispatch(receiveAllAlbums(albums)));
};

export const fetchAlbum = (id) => dispatch => {
  return AlbumApiUtil.fetchAlbum(id).then(album => 
    dispatch(receiveAlbum(album)));
};

export const createAlbum = (album) => dispatch => {
  return AlbumApiUtil.createAlbum(album).then(album => 
    dispatch(
      receiveAlbum(album, album.tracks)),
      err => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    );
};


export const updateAlbum = (album, albumId) => dispatch => {
  return AlbumApiUtil.updateAlbum(album, albumId).then(album => 
    dispatch(
      receiveAlbum(album, album.tracks)),
      err => (dispatch(receiveErrors(err.responseJSON)))
    );
};

export const createAlbumAndTracks = (album) => dispatch => {
  return AlbumApiUtil.createAlbumAndTracks(album).then(album =>
    dispatch(
      receiveAlbum(album, album.tracks),
      err => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    )
  );
};


export const updateAlbumAndTracks = ((album, albumId) => dispatch => {
  return AlbumApiUtil.updateAlbumAndTracks(album, albumId).then(album =>
    dispatch(
      receiveAlbum(album, album.tracks),
      err => {
        return dispatch(receiveErrors(err.responseJSON));
      }
    )
  );
});

const receiveAllAlbums = (albums) => {
  return {
    type: RECEIVE_ALL_ALBUMS,
    albums
  };
};

const receiveAlbum = ({album, tracks = null}) => {
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