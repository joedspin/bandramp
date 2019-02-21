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
          album={album} 
          edit="" />
      );
    });

    return (
      <React.Fragment>
        <div className="album-box">
          <h3 className="album-box-head">SELLING RIGHT NOW</h3>
          <ul className="album-thumb-container">
            {publicAlbumsIndex}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default AlbumList;