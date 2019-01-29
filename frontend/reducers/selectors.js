export const allAlbums = ({ albums }) => Object.keys(albums).map(id => albums[id]);
export const publicAlbums = ({ albums }) => Object.keys(albums).map(id => albums[published] ? albums[id]);
