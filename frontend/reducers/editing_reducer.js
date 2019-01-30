import { combineReducers } from 'redux';

import EditingChangesReducer from './editing_changes_reducer';
import EditingAlbumReducer from './editing_album_reducer';
import EditingTracksReducer from './editing_tracks_reducer';

const EditingReducer = combineReducers(
  {
    changes: EditingChangesReducer,
    album: EditingAlbumReducer,
    tracks: EditingTracksReducer
  });

export default EditingReducer;