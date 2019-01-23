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
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div>

    <Switch>
      <Route exact path="/" component={AuthLinks} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <AuthRoute exact path="/login" component={LogInFormContainer} />
    </Switch>
  </div>
);

export default App;