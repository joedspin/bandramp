export const fetchAlbums = () => {
  return $.ajax({
      method: 'GET',
      url: '/api/albums'
    });
};

export const fetchAlbum = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/albums/${id}`
  });
};

export const createAlbum = (album) => {
  return $.ajax({
    url: 'api/albums',
    method: 'POST',
    data: album,
    contentType: false,
    processData: false
  });
};



export const updateAlbum = (album, albumId) => {
  return $.ajax({
    url: `/api/albums/${albumId}`,
    method: 'PATCH',
    data: album,
    contentType: false,
    processData: false
  });
};