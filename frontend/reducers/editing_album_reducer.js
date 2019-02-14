import { RECEIVE_ALBUM } from '../actions/album_actions';
import { EDIT_ALBUM , CLEAR_FORM, ADD_TRACK } from '../actions/editing_actions';
import { merge } from 'lodash';

const EditingReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return merge({}, action.album, { selectedPane: 0 });
    case EDIT_ALBUM:
      return merge({}, state, action.album);
    case CLEAR_FORM:
      return {
        title: '',
        artist_name: '',
        release_date: '',
        description: '',
        upc_ean: '',
        catalog_number: '',
        published: false,
        trackIds: [],
        photoFile: null,
        photoUrl: null,
        photo: null
      }
    case ADD_TRACK:
      const newTrackId = ['add' + action.newTrackNum];
      let newTrackIds = state.track_ids || []
      newTrackIds = newTrackIds.concat(newTrackId);
      return merge({}, state, { track_ids: newTrackIds });
    default:
      return state;
    }
  };

  export default EditingReducer;