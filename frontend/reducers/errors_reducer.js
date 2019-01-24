import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import album from './album_errors_reducer';

export default combineReducers({
  session,
  album
});