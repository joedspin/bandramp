import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { logout }  from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = { session: {id: window.currentUser.id }};
    delete window['currentUser'];
  }
  const store = configureStore(preloadedState);
  window.store = store;
  // window.logout = logout;
  window.dispatch = store.dispatch;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});