import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

class UserHeader extends React.Component {

  render() {
    const { logout } = this.props;
    return (
      <header>
        <div className="flex-container">
          <div className="flex-7-12">
            <div className="head-brand user">
              <Link to="/" className="header-link">
                <img src={window.bandrampLogoURL} />
              </Link>&nbsp;
              <Link to="/albums/new">+add</Link>&nbsp;
              <button onClick={logout}>log out</button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(UserHeader);