import { combineReducers } from 'redux';

import EntitiesReducer from './entities_reducer';
import SessionsReducer from './sessions_reducer';
import ErrorsReducer from './errors_reducer';
import UiReducer from './ui_reducer';
import EditingReducer from './editing_reducer';

const RootReducer = combineReducers(
  {
    entities: EntitiesReducer,
    session: SessionsReducer,
    errors: ErrorsReducer,
    ui: UiReducer,
    editing: EditingReducer
  });

  export default RootReducer;