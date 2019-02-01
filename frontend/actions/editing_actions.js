export const EDIT_ALBUM = 'EDIT_ALBUM';
export const EDIT_TRACK = 'EDIT_TRACK';
export const ADD_TRACK = 'ADD_TRACK';
export const CLEAR_FORM = 'CLEAR_FORM';

export const editAlbum = (album) => {
  return { type: EDIT_ALBUM, album };
};

export const editTrack = (track) => {
  return { type: EDIT_TRACK, trackId: Object.keys(track)[0], track };
};

export const addTrack = (track, newTrackNum) => {
  return { type: ADD_TRACK, track, newTrackNum };
};

export const clearForm = () => {
  return { type: CLEAR_FORM };
};