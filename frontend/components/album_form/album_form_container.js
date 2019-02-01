import { connect } from 'react-redux';
import { fetchAlbum, fetchAlbums,
  createAlbumAndTracks, updateAlbumAndTracks } from '../../actions/album_actions';
import { editAlbum, editTrack, clearForm } from '../../actions/editing_actions';
import { clearCreatedAlbumId } from '../../actions/ui_actions';
import { AlbumForm, BLANK_ALBUM } from './album_form';

const mapStateToProps = (state, ownProps, prevProps) => {
  let editingAlbum = state.editing.album;
  let editingTracks = state.editing.tracks;
  let changes = state.editing.changes;
  let formType = 'Save Draft';
  if (typeof ownProps.match.params.albumId !== "undefined" &&
      typeof state.entities.albums !== "undefined") {
        formType = 'Update';
      }
  return {
    errors: state.errors.album,
    formType: formType,
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
    clearForm: () => dispatch(clearForm()),
    action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm);