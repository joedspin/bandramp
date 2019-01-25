import React from 'react';
import UserHeader from '../auth_form/user_header';
import AlbumUserIndex from './album_user_index_container';

export const BLANK_ALBUM = {
    title: '',
    title_display: 'Untitled Album',
    artist_name: '',
    release_date: '',
    description: '',
    upc_ean: '',
    catalog_number: '',
    published: false,
    photoFile: null,
    photoUrl: null
  };

class AlbumForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.album || BLANK_ALBUM;
    this.state.formType = this.props.formType;
    this.handleSubmit = this.handleSubmit.bind(this);
    if (this.state.title === '') {
      this.state.titleDisplay = 'Untitled Album';
    } else {
      this.state.titleDisplay = this.state.title;
    }
  }

  componentDidMount() {
    this.props.fetchAlbums();
    if (typeof this.props.match.params.albumId !== "undefined") {
      this.props.fetchAlbum(this.props.match.params.albumId)
        .then(() => {this.setState(this.props.album);});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.albumId !== this.props.match.params.albumId) {
      if (typeof this.props.match.params.albumId === "undefined") {
        this.clearForm();
        this.state.formType = 'Save Draft';
      } else {      
        this.props.fetchAlbum(this.props.match.params.albumId)
        .then(() => { this.setState(this.props.album); });
      }
    }
  }

  clearForm() {
    this.setState(BLANK_ALBUM);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
      if (field === 'title') {
        if (e.target.value === '') {
          this.setState({ titleDisplay: 'Untitled Album' });
        } else {
          this.setState({ titleDisplay: e.target.value });
        }
      }
    };
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
    const formData = new FormData();
    formData.append('album[title]', this.state.title);
    formData.append('album[artist_name]', this.state.artist_name);
    formData.append('album[release_date]', this.state.release_date);
    formData.append('album[description]', this.state.description);
    formData.append('album[upc_ean]', this.state.upc_ean);
    formData.append('album[catalog_number]', this.state.catalog_number);
    formData.append('album[published]', this.state.published);
    if (this.state.photoFile) {

      formData.append('album[photo]', this.state.photoFile);
    }
    this.props.action(formData);
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
    const preview = this.state.photoUrl ? <img src={this.state.photoUrl} /> : null;
    return (
      <div className="album-page">
        <UserHeader />
        <div className='album-form-container'>
          <h2 className="album-head">{this.state.titleDisplay}</h2>
          <form onSubmit={this.handleSubmit} className="album-form-box">
            <div className="input-wrapper">
              <label htmlFor="album-form-title">*</label>
              <input type="text" value={this.state.title}
                onChange={this.update('title')}
                id="album-form-title" required placeholder='album name' 
                className="form-album-title" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-release-date">release date:</label>
              <input type="text" value={this.state.release_date}
                onChange={this.update('release_date')}
                required placeholder="mm/dd/yyyy (optional)"
                id="album-form-release-date" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-artist-name">artist:</label>
              <input type="text" value={this.state.artist_name}
                onChange={this.update('artist_name')}
                required
                id="album-form-artist-name" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-description">about:</label>
              <textarea value={this.state.description}
                onChange={this.update('description')}
                placeholder="(optional)"
                id="album-form-description" rows="6" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-description">album UPC/EAN code:</label>
              <input type="text" value={this.state.upc_ean}
                onChange={this.update('upc_ean')}
                placeholder="(optional)"
                id="album-form-upc-ean" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-catalog-number">catalog number:</label>
              <input type="text" value={this.state.catalog_number}
                onChange={this.update('catalog_number')}
                placeholder="(optional)"
                id="album-form-catalog-number" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-cover-art">cover art:</label>
              <input type="file"
                onChange={this.handleFile.bind(this)} 
                id="album-cover-art"/>
            </div>
            {preview}
            <div className="input-wrapper">
              <input type="submit" value={this.state.formType}
                id="album-form-submit" />
            </div>
            {this.renderErrors()}
          </form>
        </div>
        <AlbumUserIndex />
      </div>
    );
  }
}

export { AlbumForm };