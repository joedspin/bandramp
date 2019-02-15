import React from 'react';
import { CoverArt } from './album_form_container';
import { convertDate } from '../../util/album_api_util';

class AlbumDataComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  privateLabel() {
    let privateLabel = '';
    if (!this.props.editingAlbum.published) {
      privateLabel = <p>Private albums are not visible to fans</p>
    }
    return privateLabel;
  }

  render() {
    let rDate;
    if (this.props.editingAlbum.release_date.length) {
      rDate = convertDate(this.props.editingAlbum.release_date, 1);
    } else {
      rDate = '';
    }
    return (
      <div>
        <div className="input-wrapper">
          <input type="text" value={this.props.editingAlbum.title}
            onChange={this.props.ctx.editAlbum('title').bind(this.props.ctx)}
            id="album-form-title" required placeholder='album name' />
        </div>
        <div className="input-wrapper">
          <div className="album-form-date">
            <label className="album-form-label" htmlFor="album-form-release-date">release date:</label>
            <input type="date" value={rDate}
              onChange={this.props.ctx.editAlbum('release_date').bind(this.props.ctx)}
              id="album-form-release-date" /> <label className="album-form-label"> &nbsp;(optional)</label>
          </div>
        </div>
        <div>{this.privateLabel()}</div>
        <div className="album-rule"></div>
        <CoverArt photo={this.props.editingAlbum.photo} photoUrl={this.props.editingAlbum.photoUrl} ctx={this.props.ctx}/>
        <div className="album-rule"></div>
        <div className="input-wrapper">
          <label className="album-form-label" htmlFor="album-form-artist-name">artist:</label>
          <input type="text" value={this.props.editingAlbum.artist_name}
            onChange={this.props.ctx.editAlbum('artist_name').bind(this.props.ctx)}
            required
            id="album-form-artist-name" />
        </div>
        <div className="input-wrapper with-textarea">
          <label className="album-form-label" htmlFor="album-form-description">about:</label>
          <textarea className="album-textarea"
            value={this.props.editingAlbum.description}
            onChange={this.props.ctx.editAlbum('description').bind(this.props.ctx)}
            placeholder="(optional)"
            id="album-form-description" rows="6" />
        </div>
        <div className="album-rule"></div>
        <div className="input-wrapper">
          <label className="album-form-label" htmlFor="album-form-description">album UPC/EAN code:</label>
          <input type="text" value={this.props.editingAlbum.upc_ean}
            onChange={this.props.ctx.editAlbum('upc_ean').bind(this.props.ctx)}
            placeholder="(optional)"
            id="album-form-upc-ean" />
        </div>
        <div className="input-wrapper">
          <label className="album-form-label" htmlFor="album-form-catalog-number">catalog number:</label>
          <input type="text" value={this.props.editingAlbum.catalog_number}
            onChange={this.props.ctx.editAlbum('catalog_number').bind(this.props.ctx)}
            placeholder="(optional)"
            id="album-form-catalog-number" />
        </div>
      </div>
    );
   }
  }

  export default AlbumDataComponent;