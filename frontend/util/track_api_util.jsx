export const fetchTracks = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/tracks'
  });
};

export const fetchTracks = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/tracks/${id}`
  });
};

export const createTrack = (track) => {
  return $.ajax({
    url: 'api/tracks',
    method: 'POST',
    data: track,
    contentType: false,
    processData: false
  });
};

export const updateTrack = (track, trackId) => {
  return $.ajax({
    url: `/api/tracks/${trackId}`,
    method: 'PATCH',
    data: track,
    contentType: false,
    processData: false
  });
};