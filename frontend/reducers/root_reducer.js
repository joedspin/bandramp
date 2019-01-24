import { combineReducers } from 'redux';

import SessionsReducer from './sessions_reducer';
import UsersReducer from './users_reducer';
import ErrorsReducer from './errors_reducer';
import AlbumsReducer from './albums_reducer';

const RootReducer = combineReducers(
  {
    users: UsersReducer,
    session: SessionsReducer,
    errors: ErrorsReducer,
    albums: AlbumsReducer
  });

  export default RootReducer;