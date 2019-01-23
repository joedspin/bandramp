import React from 'react';
// import { Provider } from 'react-redux';
import {
  Route,
  // Redirect,
  Switch,
  Link,
  // HashRouter
} from 'react-router-dom';

import AuthLinks from './auth_links';
import SignUpFormContainer from './signup_form_container';
import LogInFormContainer from './login_form_container';
import DemoLogInFormContainer from './demo_login_form_container';
import UserHeader from './user_header';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>

    <Switch>
      <Route exact path="/home" component={AuthLinks} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/login/demo" component={DemoLogInFormContainer} />
      {/* <AuthRoute exact path="/" component={AuthLinks} /> */}
      <ProtectedRoute path="/" component={UserHeader} />
    </Switch>
  </div>
);

export default App;