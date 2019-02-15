import React from 'react';
import { Link } from 'react-router-dom';

class AuthLinks extends React.Component {
  render () {
    return (
      <header>
        <div className="flex-container">
          <div className="flex-7-12">
            <div className="head-brand">
              <Link to="/">
                <img src={this.props.theme === 'dark' ? window.bandrampLogoDarkUrl : window.bandrampLogoURL} />
              </Link>
              <div className="head-statement">
                <h2>Discover amazing new music and&nbsp;
                      <span className="head-highlight">directly support</span>&nbsp;
                      the artists who make it.</h2>
              </div>
            </div>
          </div>
          <div className="flex-5-12">
            <div className="head-links">
              <ul>
                <li><Link to="/login/demo"><span className="head-highlight">Demo log in!</span></Link></li>
                <li><Link to="/signup">sign up</Link></li>
                <li><Link to="/login">log in</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default AuthLinks;