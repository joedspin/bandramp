import { RECEIVE_ALBUM } from '../actions/album_actions';
import { EDIT_ALBUM } from '../actions/editing_actions';
import { CLEAR_FORM } from '../actions/editing_actions';
import { merge } from 'lodash';

const EditingReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALBUM:
      return action.album;
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
    default:
      return state;
    }
  };

  export default EditingReducer;