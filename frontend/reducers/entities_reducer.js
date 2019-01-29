import { combineReducers } from 'redux';

import UsersReducer from './users_reducer';
import AlbumsReducer from './albums_reducer';

const EntitiesReducer = combineReducers(
  {
    users: UsersReducer,
    albums: AlbumsReducer
  });

export default EntitiesReducer;