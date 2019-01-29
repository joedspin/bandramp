import React from 'react';
import AlbumLink from './album_link';

class AlbumList extends React.Component {

  componentDidMount() {
    this.props.fetchAlbums();
  }

  render() {
    let publicAlbumsIndex = null;
    publicAlbumsIndex = this.props.publicAlbums.map((album) => {
      return (
        <AlbumLink
          key={album.id}
          album={album} />
      );
    });

    return (
      <div>
        <div className="album-box">
          <ul className="album-thumb-container">
            {publicAlbumsIndex}
          </ul>
        </div>
      </div>
    );
  }
}

export default AlbumList;