import * as PostApiUtil from '../util/session_api_util';


export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const login = (user) => dispatch => {
  return PostApiUtil.login(user).then(user => 
    dispatch(
      receiveCurrentUser(user)), 
      err => (dispatch(receiveErrors(err.responseJSON)))
    );
};

export const logout = () => dispatch => {
  return PostApiUtil.logout().then(user => 
    dispatch(logoutCurrentUser()));
};

export const signup = (user) => dispatch => {
  return PostApiUtil.signup(user).then(user =>
    dispatch(
      receiveCurrentUser(user)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  );
};

const receiveCurrentUser = ({ user, albums }) => {
  return {
    type: RECEIVE_CURRENT_USER,
    user,
    albums
  };
};

const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};