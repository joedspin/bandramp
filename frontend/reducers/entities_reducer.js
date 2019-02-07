import { combineReducers } from 'redux';

import UsersReducer from './users_reducer';
import AlbumsReducer from './albums_reducer';
import TracksReducer from './tracks_reducer';

const EntitiesReducer = combineReducers(
  {
    users: UsersReducer,
    tracks: TracksReducer,
    albums: AlbumsReducer
  });

export default EntitiesReducer;