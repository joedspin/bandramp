import React from 'react';
import UserHeader from './user_header';
import AlbumUserList from '../album_form/album_user_index_container';

const UserHome = () => (
  <div>
    <UserHeader theme="light" />
    <AlbumUserList />
  </div>
);

export default UserHome;