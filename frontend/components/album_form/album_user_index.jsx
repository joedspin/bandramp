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
    let userAlbumsIndex = null;
    userAlbumsIndex = this.props.userAlbums.map ((album) => {
        return (
          <AlbumItemLink 
            key={album.id}
            album={album} 
            edit="/edit" />
        );
      });

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