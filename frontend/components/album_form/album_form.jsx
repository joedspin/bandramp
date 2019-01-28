import React from 'react';
import UserHeader from '../auth_form/user_header';
import AlbumUserIndex from './album_user_index_container';

export const BLANK_ALBUM = {
    title: '',
    titleDisplay: 'Untitled Album',
    artistDisplay: '',
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

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

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
    this.state.artistDisplay = this.state.artist;
  }

  componentDidMount() {
    this.props.fetchAlbums();
    if (typeof this.props.match.params.albumId !== "undefined") {
      this.props.fetchAlbum(this.props.match.params.albumId)
        .then(() => {this.setState(this.props.album);});
    }
    if (this.state.title === '') {
      debugger
      this.state.titleDisplay = 'Untitled Album';
    } else {
      this.setState({ titleDisplay: this.state.title });
    }
    this.setState({ artistDisplay: this.state.artist_name });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.albumId !== this.props.match.params.albumId) {
      if (typeof this.props.match.params.albumId === "undefined") {
        this.clearForm();
        this.state.formType = 'Save Draft';
      } else {      
        this.props.fetchAlbum(this.props.match.params.albumId)
        .then(() => { this.setState(this.props.album); });
        if (this.props.title === '') {
          this.state.titleDisplay = 'Untitled Album';
        } else {
          this.setState({ titleDisplay: this.props.title });
        }
        this.setState({ artistDisplay: this.props.artist_name });
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
      if (field === 'artist_name') {
        this.setState({ artistDisplay: e.target.value });
      }
    };
  }

  fillFormData() {
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
    } else {
      formData.append('album[photo]', 'delete');
    }
    return formData;
  }

  deleteCoverArt(e) {
    e.preventDefault();
    this.setState({photo: null, photoFile: null, photoUrl: null});
    const formData = this.fillFormData();
    if (this.state.formType === 'Update') {
      this.props.action(formData);
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
    let rDate;
    let rDateString;
    if (this.state.release_date) {
      const relDate = new Date(this.state.release_date);
      let rDateMonth = ("0" + (relDate.getMonth() + 1));
      rDateMonth = rDateMonth.substring(rDateMonth.length-2);
      let rDateDay = ("0" + (relDate.getDate()));
      rDateDay = rDateDay.substring(rDateDay.length-2);
      rDate = rDateMonth + "/" + relDate.getDate() + "/" + relDate.getFullYear();
      rDateString = MONTH_NAMES[relDate.getMonth()]+" "+rDateDay+", "+relDate.getFullYear();
    } else {
      rDate = '';
      rDateString = '';
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
        <img className="album-image-blank" />
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
                <input type="text" value={rDate}
                  onChange={this.update('release_date')}
                  required placeholder="mm/dd/yyyy"
                    id="album-form-release-date" />  (optional)
                </div>
              </div>
              <div className="input-wrapper">
                <label className="album-form-label" htmlFor="album-form-artist-name">artist:</label>
                <input type="text" value={this.state.artist_name}
                  onChange={this.update('artist_name')}
                  required
                  id="album-form-artist-name" />
              </div>
              <div className="input-wrapper">
                <label className="album-form-label" htmlFor="album-form-description">about:</label>
                <textarea value={this.state.description}
                  onChange={this.update('description')}
                  placeholder="(optional)"
                  id="album-form-description" rows="6" />
              </div>
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
              {coverArt}
              <div className="input-wrapper">
                <input type="submit" value={this.state.formType}
                  id="album-form-submit" />
              </div>
              {this.renderErrors()}
            </form>
          </div>
          <div className="album-menu-column">
            <div className="album-title-menu">
              {coverThumb}
              <div>
                <h3 className="album-head">{this.state.titleDisplay}</h3>
                <p>by <strong>{this.state.artistDisplay}</strong></p>
                <p>{rDateString}</p>
              </div>
            </div>
          </div>
          
        </div>
        <AlbumUserIndex />
      </div>
    );
  }
}

export { AlbumForm };