import React from 'react';
// import { Provider } from 'react-redux';
import {
  Route,
  // Redirect,
  Switch,
  Link,
  // HashRouter
} from 'react-router-dom';

import AuthLinks from './auth_form/auth_links';
import SignUpFormContainer from './auth_form/signup_form_container';
import LogInFormContainer from './auth_form/login_form_container';
import DemoLogInFormContainer from './auth_form/demo_login_form_container';
import AlbumUserList from './album_form/album_user_index_container';
import AlbumForm from './album_form/album_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>

    <Switch>
      <Route exact path="/home" component={AuthLinks} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/login/demo" component={DemoLogInFormContainer} />
      <ProtectedRoute path="/albums/new" component={AlbumForm} />
      <ProtectedRoute path="/albums/:albumId/edit" component={AlbumForm} />
      <ProtectedRoute path="/" component={AlbumUserList} />
    </Switch>
  </div>
);

export default App;