import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import usersReducer from '../reducers/users_reducer';

const configureStore = (preloadedState = {}) => (
  createStore(usersReducer, preloadedState, applyMiddleware(thunk, logger))
);

export default configureStore;