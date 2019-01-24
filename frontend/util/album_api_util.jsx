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
    method: 'POST',
    url: 'api/albums',
    data: { album }
  });
};

export const updateAlbum = (album) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/albums/${album.id}`,
    data: { album }
  });
};