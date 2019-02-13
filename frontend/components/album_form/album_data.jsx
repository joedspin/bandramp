import React from 'react';
import { CoverArt } from './album_cover';


class AlbumData extends React.Component {
  constructor(props) {
    super(props);
    this.album = props.editingAlbum;
    this.ctx = props.ctx;
  }

  privateLabel() {
    let privateLabel = '';
    if (!this.album.published) {
      privateLabel = <p>Private albums are not visible to fans</p>
    }
    return privateLabel;
  }

  render() {

    let rDate;
    if (this.album.release_date.length) {
      rDate = this.ctx.convertDate(this.album.release_date, 1);
    } else {
      rDate = '';
    }
    return (
      <div>
        <div className="input-wrapper">
          <input type="text" value={this.album.title}
            onChange={this.ctx.editAlbum('title')}
            id="album-form-title" required placeholder='album name' />
        </div>
        <div className="input-wrapper">
          <div className="album-form-date">
            <label className="album-form-label" htmlFor="album-form-release-date">release date:</label>
            <input type="date" value={rDate}
              onChange={this.ctx.editAlbum('release_date')}
              id="album-form-release-date" /> <label className="album-form-label"> &nbsp;(optional)</label>
          </div>
        </div>
        <div>{this.privateLabel()}</div>
        <div className="album-rule"></div>
        <CoverArt photo={this.album.photo} photoUrl={this.album.photoUrl} ctx={this.ctx} />
        <div className="album-rule"></div>
        <div className="input-wrapper">
          <label className="album-form-label" htmlFor="album-form-artist-name">artist:</label>
          <input type="text" value={this.album.artist_name}
            onChange={this.ctx.editAlbum('artist_name')}
            required
            id="album-form-artist-name" />
        </div>
        <div className="input-wrapper with-textarea">
          <label className="album-form-label" htmlFor="album-form-description">about:</label>
          <textarea className="album-textarea"
            value={this.album.description}
            onChange={this.ctx.editAlbum('description')}
            placeholder="(optional)"
            id="album-form-description" rows="6" />
        </div>
        <div className="album-rule"></div>
        <div className="input-wrapper">
          <label className="album-form-label" htmlFor="album-form-description">album UPC/EAN code:</label>
          <input type="text" value={this.album.upc_ean}
            onChange={this.ctx.editAlbum('upc_ean')}
            placeholder="(optional)"
            id="album-form-upc-ean" />
        </div>
        <div className="input-wrapper">
          <label className="album-form-label" htmlFor="album-form-catalog-number">catalog number:</label>
          <input type="text" value={this.album.catalog_number}
            onChange={this.ctx.editAlbum('catalog_number')}
            placeholder="(optional)"
            id="album-form-catalog-number" />
        </div>
      </div>
    );
   }
  }

  export default AlbumData;