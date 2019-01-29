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

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export const convertDate = (rawDate, outputType) => {
  // outputType 
  // 1 = yyyy-mm-dd; outputType 
  // 2 = mm/dd/yyyy; outputType 
  // 3 (default) = Mmm dd, yyyy
  const relDate = new Date(rawDate);
  let rDateMonth = ("0" + (relDate.getMonth() + 1));
  rDateMonth = rDateMonth.substring(rDateMonth.length - 2);
  let rDateDay = ("0" + (relDate.getDate() + 1));
  rDateDay = rDateDay.substring(rDateDay.length - 2);
  let rDateYear = relDate.getFullYear();
  if (outputType === 1) {
    return rDateYear + "-" + rDateMonth + "-" + rDateDay;
  } else if (outputType === 2) {
    return rDateMonth + "/" + rDateDay + "/" + rDateYear;
  }
  return MONTH_NAMES[relDate.getMonth()] + " " + rDateDay + ", " + rDateYear;
};