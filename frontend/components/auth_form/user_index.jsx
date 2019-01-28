import React from 'react';
import UserHeader from './user_header';
import AlbumUserList from '../album_form/album_user_index';

const UserHome = () => (
  <div>
    <UserHeader />
    <AlbumUserList />
  </div>
);

export default UserHome;