import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

class UserHeader extends React.Component {

  render() {
    const { logout } = this.props;
    return (
      <div className="user-header-container">
        <header className="user-header">
          <div className="flex-container">
            <div className="flex-7-12">
              <div className="head-brand user">
                <Link to="/">
                  <img src={window.bandrampLogoURL} />
                </Link>
                <Link className="header-link" to="/albums/new">+add</Link>
                <button className="logout" onClick={logout}>log out</button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(UserHeader);