import React from 'react';
import { Route, Switch, } from 'react-router-dom';

import SignUpFormContainer from './auth_form/signup_form_container';
import LogInFormContainer from './auth_form/login_form_container';
import DemoLogInFormContainer from './auth_form/demo_login_form_container';
import UserHome from './auth_form/user_index';
import Home from './auth_form/home_container';
import AlbumShow from './album_show/album_show_container';
import { AlbumForm } from './album_form/album_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
const App = () => (
    <Switch>
      <Route exact path="/home" component={Home} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/login/demo" component={DemoLogInFormContainer} />
      <ProtectedRoute path="/albums/new" component={AlbumForm} />
      <ProtectedRoute path="/albums/:albumId/edit" component={AlbumForm} />
      <Route exact path="/albums/:albumId" component={AlbumShow} />
      <ProtectedRoute path="/" component={UserHome} />
    </Switch>
);

export default App;