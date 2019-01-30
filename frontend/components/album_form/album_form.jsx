import React from 'react';
import UserHeader from '../auth_form/user_header';
import AlbumUserIndex from './album_user_index_container';
import { convertDate } from '../../util/album_api_util';
import { clearCreatedAlbumId } from '../../actions/ui_actions';

export const BLANK_ALBUM = {
    title: '',
    artist_name: '',
    release_date: '',
    description: '',
    upc_ean: '',
    catalog_number: '',
    published: false,
    photoFile: null,
    photoUrl: null,
    photo: null
  };

class AlbumForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.album || BLANK_ALBUM;
    this.state.formType = this.props.formType;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchAlbums();
    if (typeof this.props.match.params.albumId !== "undefined") {
      this.props.fetchAlbum(this.props.match.params.albumId)
        .then(() => {
          this.setState(this.props.album);
        });
    } else {
      this.setState({formType: 'Save Draft'});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.albumId !== this.props.match.params.albumId) {
      if (typeof this.props.match.params.albumId === "undefined") {
        this.clearForm();
        this.setState({ formType: 'Save Draft' });
      } else {
        this.setState({ formType: 'Update' });
        this.props.fetchAlbum(this.props.match.params.albumId)
        .then(() => { this.setState(this.props.album); }).then(() => {
          if (prevProps.match.path === '/albums/new') {
            this.props.clearCreatedAlbumId();
          }
        });
      }
    }
  }

  clearForm() {
    this.setState(BLANK_ALBUM);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  fillFormData(photoDelete = false) {
    const formData = new FormData();
    formData.append('album[title]', this.state.title);
    formData.append('album[artist_name]', this.state.artist_name);
    formData.append('album[release_date]', this.state.release_date);
    formData.append('album[description]', this.state.description);
    formData.append('album[upc_ean]', this.state.upc_ean);
    formData.append('album[catalog_number]', this.state.catalog_number);
    formData.append('album[published]', this.state.published);
    if (photoDelete) {
      formData.append('album[photo]', 'delete');
    } else if (this.state.photoFile) {
      formData.append('album[photo]', this.state.photoFile);
    }
    return formData;
  }

  deleteCoverArt(e) {
    e.preventDefault();
    this.setState({photo: 'delete', photoFile: null, photoUrl: null});
    const formData = this.fillFormData(true);
    if (this.state.formType === 'Update') {
      this.props.action(formData).then(() => {this.setState({photo: ''});});
    }
  }



  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    
    e.preventDefault();
    const formData = this.fillFormData();
    this.props.action(formData).then(() => { 
      this.setState({ photo: this.state.photo || this.state.photoUrl, 
        photoFile: null, 
        photoUrl: null,
        formType: 'Update'});
    }).then(() => {this.props.history.push(`/albums/${this.props.createdAlbumId}/edit`)});
  }

  renderErrors() {
    return (
      <ul className="form-errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }



  render() {
    let artistString ='';
    if (this.state.artist_name) {
      artistString = (
        <p>by <strong>{this.state.artist_name}</strong></p>
      );
    }
    let rDate;
    let rDateString;
    if (this.state.release_date.length) {
      rDate = convertDate(this.state.release_date, 1);
      rDateString = convertDate(this.state.release_date, 3);
    } else {
      rDate = '';
      rDateString = '';
    }
    let privateTag = '';
    if (!this.state.published) {
      privateTag = (
        <p><span className="album-private">private</span></p>
      );
    }
    let coverArt;
    let coverThumb;
    if (this.state.photoUrl) {
      coverArt = (
        <div className="album-image-thumb">
          <img className="album-image-1" src={this.state.photoUrl} />
        </div>
      );
      coverThumb = (
        <img className="album-image-2" src={this.state.photoUrl} />
      );
    } else if (this.state.photo) {
      coverArt = (
        <div className="album-image-thumb">
          <img className="album-image-1" src={this.state.photo} />
          <button onClick={this.deleteCoverArt.bind(this)} className="delete">X</button>
        </div>
      );
      coverThumb = (
        <img className="album-image-2" src={this.state.photo} />
      );
    } else {
      coverArt = (
        <div className="input-wrapper">
          <label htmlFor="album-cover-art">cover art:</label>
          <input type="file"
            onChange={this.handleFile.bind(this)}
            id="album-cover-art" />
        </div>
      );
      coverThumb = (
        <div className="album-image-blank"></div>
      );
    }
    let privateLabel = '';
    if (!this.state.published) {
      privateLabel = (
        <p>Private albums are not visible to fans</p>
      );
    }
    return (
      <div className="album-page">
        <UserHeader />
        <div className='album-form-container'>  
          <div className="album-info-column">
            <form onSubmit={this.handleSubmit} className="album-form-box">
              <div className="input-wrapper">
                <input type="text" value={this.state.title}
                  onChange={this.update('title')}
                  id="album-form-title" required placeholder='album name' />
              </div>
              <div className="input-wrapper">
                <div className="album-form-date">
                <label className="album-form-label" htmlFor="album-form-release-date">release date:</label>
                <input type="date" value={rDate}
                  onChange={this.update('release_date')}
                    id="album-form-release-date" /> <label className="album-form-label"> &nbsp;(optional)</label>
                </div>
              </div>
              {privateLabel}
              <div className="album-rule"></div>
              {coverArt}
              <div className="album-rule"></div>
              <div className="input-wrapper">
                <label className="album-form-label" htmlFor="album-form-artist-name">artist:</label>
                <input type="text" value={this.state.artist_name}
                  onChange={this.update('artist_name')}
                  required
                  id="album-form-artist-name" />
              </div>
              <div className="input-wrapper with-textarea">
                <label className="album-form-label" htmlFor="album-form-description">about:</label>
                <textarea className="album-textarea"
                  value={this.state.description}
                  onChange={this.update('description')}
                  placeholder="(optional)"
                  id="album-form-description" rows="6" />
              </div>
              <div className="album-rule"></div>
              <div className="input-wrapper">
                <label className="album-form-label" htmlFor="album-form-description">album UPC/EAN code:</label>
                <input type="text" value={this.state.upc_ean}
                  onChange={this.update('upc_ean')}
                  placeholder="(optional)"
                  id="album-form-upc-ean" />
              </div>
              <div className="input-wrapper">
                <label className="album-form-label" htmlFor="album-form-catalog-number">catalog number:</label>
                <input type="text" value={this.state.catalog_number}
                  onChange={this.update('catalog_number')}
                  placeholder="(optional)"
                  id="album-form-catalog-number" />
              </div>
            </form>
          </div>
          <div className="album-menu-column">
            <div className="album-title-menu">
              {coverThumb}
              <div>
                <h3 className="album-head">{this.state.title || 'Untitled Album'}</h3>
                {artistString}
                {rDateString}
                {privateTag}
              </div>
            </div>
            <div className="album-publish-menu">
              <h4 className="album-publish-head">Publish</h4>
              <ul>
                <li><input onChange={this.update('published')} 
                  type="radio" 
                  value="true" 
                  checked={String(this.state.published) === "true"} /> public</li>
                <li><input onChange={this.update('published')} 
                  type="radio" 
                  value="false" 
                  checked={String(this.state.published) === "false"} /> private</li>
              </ul>
            </div>
            <div className="input-wrapper">
              <input onClick={this.handleSubmit}
                type="submit" value={this.state.formType}
                id="album-form-submit" />
            </div>
            {this.renderErrors()}
          </div>
        </div>
        <AlbumUserIndex/>
      </div>
    );
  }
}

export { AlbumForm };