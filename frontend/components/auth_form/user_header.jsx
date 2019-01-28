import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

class UserHeader extends React.Component {

  addAlbum() {
    this.props.history.push('/albums/new');
  }

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
                <button className="header-link" onClick={this.addAlbum.bind(this)}>+add</button>
                <button className="logout" onClick={logout}>log out</button>
              </div>
            </div>
            <div className="flex-5-12">
              <Link to="/user"><div className="user-global-link"></div></Link>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    history: ownProps.history
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHeader));