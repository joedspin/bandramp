import React from 'react';
import { Link } from 'react-router-dom';

class AuthLinks extends React.Component {
  render() {
    return (
      <header>
        <div className="flex-container">
          <div className="flex-12-12">
            <div className="head-brand auth">
              <Link to="/" className="header-link">
                <img src={window.bandrampLogoURL} />
              </Link>
        </div>
      </header>
    );
    }
  }

  export default AuthLinks;