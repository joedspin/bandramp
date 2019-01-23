import React from 'react';
// import { Provider } from 'react-redux';
import {
  // Route,
  // Redirect,
  Switch,
  Link,
  // HashRouter
} from 'react-router-dom';

import SignUpFormContainer from './session_form/signup_form_container';
// import LogInFormContainer from './session_form/login_form_container';
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <div className="flex-container">
        <div className="flex-7-12">
          <div className="head-brand">
            <Link to="/" className="header-link">
              <img src={window.bandrampLogoURL} />
            </Link>
          </div>
          <div className="head-statement">
            <h2>Discover amazing new music and&nbsp;
              <span className="head-highlight">directly support</span>&nbsp;
              the artists who make it.</h2>
          </div>
        </div>
        <div className="flex-5-12">
          <div className="head-links">
            <ul>
              <li>sign up</li>
              <li>log in</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <Switch>
      {/* <AuthRoute exact path="/login" component={LogInFormContainer} /> */}
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
    </Switch>
  </div>
);

export default App;