import React from 'react';
import AlbumItemLink from './album_item_link';

class AlbumUserList extends React.Component {

  componentDidMount() {
    this.props.fetchAlbums();
  }

  componentDidMount() {
    this.render();
  }

  render() {
    let userAlbumsIndex = (
      <div className="no-albums">You don't have any albums yet. Click add+ above to create your first album.'</div>
    );
    let noAlbums = true;
    userAlbumsIndex = this.props.userAlbums.map ((album) => {
        noAlbums = false;
        return (
          <AlbumItemLink 
            key={album.id}
            album={album} 
            edit="/edit" />
        );
      });
    if (noAlbums) userAlbumsIndex = (
      <div className="no-albums">You don't have any albums yet. Click +add above to create your first album.</div>
    );
    return (
      <div>
        <div className="album-box">
          <ul className="album-thumb-container">
            {userAlbumsIndex}
          </ul>
        </div>
      </div>
    );
  }
}

export default AlbumUserList;