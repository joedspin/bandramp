import { connect } from 'react-redux';
import { createAlbum, updateAlbum, fetchAlbum, fetchAlbums,
  createAlbumAndTracks, updateAlbumAndTracks } from '../../actions/album_actions';
import { editAlbum, editTrack } from '../../actions/editing_actions';
import { updateTracks } from '../../actions/track_actions';
import { clearCreatedAlbumId } from '../../actions/ui_actions';
import { AlbumForm, BLANK_ALBUM } from './album_form';

const mapStateToProps = (state, ownProps) => {
  let album = BLANK_ALBUM;
  let tracks = {};
  let formType = 'Save Draft';
  let editingAlbum = BLANK_ALBUM;
  let editingTracks = {};
  let changes = {albumChanged: false, tracksChanged: []};
  if (typeof ownProps.match.params.albumId !== "undefined" &&
      typeof state.entities.albums !== "undefined") {
    album = state.entities.albums[ownProps.match.params.albumId] || BLANK_ALBUM;
    album.trackIds = album.trackIds || [];
    album.trackIds.forEach ((trackId) => {
      tracks[trackId] = state.entities.tracks[trackid];
    });
    formType = 'Update';
  }
  if (typeof state.editing.album !== "undefined") {
    editingAlbum = state.editing.album;
  }
  if (typeof state.editing.tracks !== "undefined") {
    editingTracks = state.editing.tracks;
  }
  if (typeof state.editing.changes !== "undefined") {
    changes = state.editing.changes;
  }
  return {
    errors: state.errors.album,
    album,
    tracks,
    formType,
    createdAlbumId: state.ui.createdAlbumId,
    editing: {album: editingAlbum, tracks: editingTracks, changes: changes}
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let action = (editing) => dispatch(createAlbumAndTracks(editing));
  const albumId = ownProps.match.params.albumId;
  if (typeof albumId !== "undefined") {
    action = (editing) => dispatch(updateAlbumAndTracks(editing, albumId));
  }
  return {
    fetchAlbum: (albumId) => dispatch(fetchAlbum(albumId)),
    fetchAlbums: () => dispatch(fetchAlbums()),
    editAlbum: (album) => dispatch(editAlbum(album)),
    editTrack: (track) => dispatch(editTrack(track)),
    clearCreatedAlbumId: () => dispatch(clearCreatedAlbumId()),
    action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm);