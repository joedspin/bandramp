import React from 'react';
import UserHeader from './user_header';
import AuthLinks from './auth_links';
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
      <div>
        {this.headerLinks()}
        <AlbumList />
      </div>
    );
  }
}

export default Home;