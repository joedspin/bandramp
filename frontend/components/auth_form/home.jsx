import React from 'react';
import UserHeader from './user_header';
import AuthLinks from './auth_links';
import SplashFeatureList from '../splash/splash_container';
import AlbumList from '../album_form/album_index_container';
 
class Home extends React.Component {

  headerLinks() {
    if (this.props.proSignedIn) {
      return (<UserHeader />);
    } else {
      return (<AuthLinks />);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.headerLinks()}
        <SplashFeatureList />
        <p className="home-message">Fans have paid artists <strong>$354 million</strong> using Bandramp, and <strong>$7.2 million</strong> in the last 30 days alone.</p>
        <AlbumList />
        <div className="auth-footer">

        </div>
      </React.Fragment>
    );
  }
}

export default Home;