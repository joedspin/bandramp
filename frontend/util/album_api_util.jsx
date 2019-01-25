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
    // method: 'POST',
    // url: 'api/albums',
    // data: { album }
    url: 'api/albums',
    method: 'POST',
    data: album,
    contentType: false,
    processData: false
  });
};



export const updateAlbum = (album, albumId) => {
  return $.ajax({
    // method: 'PATCH',
    // url: `/api/albums/${album.id}`,
    // data: { album }
    url: `/api/albums/${albumId}`,
    method: 'PATCH',
    data: album,
    contentType: false,
    processData: false
  });
};