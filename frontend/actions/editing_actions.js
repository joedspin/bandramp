export const EDIT_ALBUM = 'EDIT_ALBUM';
export const EDIT_TRACK = 'EDIT_TRACK';

export const editAlbum = (album) => {
  return { type: EDIT_ALBUM, album };
};

export const editTrack = (track) => {
  return { type: EDIT_TRACK, trackId: track.id, track };
};