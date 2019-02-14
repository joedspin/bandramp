import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAlbum, fetchAlbums,
  createAlbumAndTracks, updateAlbumAndTracks } from '../../actions/album_actions';
import { editAlbum, editTrack, clearForm } from '../../actions/editing_actions';
import { clearCreatedAlbumId } from '../../actions/ui_actions';
import { AlbumFormComponent } from './album_form';
import AlbumDataComponent from './album_data';
import { CoverArtComponent, CoverThumbComponent } from './album_cover';

const mapStateToProps = (state, ownProps) => {
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
    editing: {
      album: editingAlbum, 
      tracks: editingTracks, 
      changes: changes
    }
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

export const AlbumForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumFormComponent));
export const AlbumData = withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumDataComponent));
export const CoverArt = withRouter(connect(mapStateToProps, mapDispatchToProps)(CoverArtComponent));
export const CoverThumb = withRouter(connect(mapStateToProps, mapDispatchToProps)(CoverThumbComponent));