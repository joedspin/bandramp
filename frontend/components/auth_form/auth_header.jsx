import React from 'react';
import { Link } from 'react-router-dom';

class AuthHeader extends React.Component {
  render() {
    return (
      <div className="header-container">
        <header>
          <div className="flex-container">
            <div className="flex-12-12">
              <div className="head-brand auth">
                <Link to="/">
                  <img src={this.props.theme === 'dark' ? window.bandrampLogoDarkUrl : window.bandrampLogoURL} />
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
    }
  }

  export default AuthHeader;