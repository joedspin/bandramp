import React from 'react';
import UserHeader from '../auth_form/user_header';
import AlbumUserIndex from './album_user_index_container';
import { convertDate } from '../../util/album_api_util';
import TracksForm from '../track_form/tracks_form_container';
import { merge } from 'lodash';

export const BLANK_ALBUM = {
    title: '',
    artist_name: '',
    release_date: '',
    description: '',
    upc_ean: '',
    catalog_number: '',
    published: false,
    trackIds: [],
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

  // if it exists, get the album data from the Redux state
  getAlbum() {
    let editingAlbum = BLANK_ALBUM;
    if (this.props.editing && this.props.editing.album) {
      editingAlbum = merge({}, editingAlbum, this.props.editing.album);
    }
    return editingAlbum
  }

  clearForm() {
    this.setState(BLANK_ALBUM);
  }

  editAlbum(field) {
    return (e) => {
      this.props.editAlbum({ [field]: e.target.value });
    };
  }

  editAlbumPhoto(photo, photoUrl, photoFile) {
    this.props.editAlbum({ 
      [photo]: photo,
      [photoUrl]: photoUrl,
      [photoFile]: photoFile
    });
  }

  fillFormData(photoDelete = false) {
    let editingAlbum = this.getAlbum();
    const formData = new FormData();
    formData.append('album[title]', editingAlbum.title);
    formData.append('album[artist_name]', editingAlbum.artist_name);
    formData.append('album[release_date]', editingAlbum.release_date);
    formData.append('album[description]', editingAlbum.description);
    formData.append('album[upc_ean]', editingAlbum.upc_ean);
    formData.append('album[catalog_number]', editingAlbum.catalog_number);
    formData.append('album[published]', editingAlbum.published);
    if (photoDelete) {
      formData.append('album[photo]', 'delete');
    } else if (editingAlbum.photoFile) {
      formData.append('album[photo]', editingAlbum.photoFile);
    }
    return formData;
  }

  deleteCoverArt(e) {
    let editingAlbum = this.getAlbum();
    e.preventDefault();
    this.editAlbumPhoto('delete', '', '');
    const formData = this.fillFormData(true);
    if (this.state.formType === 'Update') {
      this.props.action(formData).then(() => {this.setState({photo: ''});});
    }
  }

  handleFile(e) {
    let editingAlbum = this.getAlbum();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
       this.editAlbumPhoto(
        editingAlbum.photo || editingAlbum.photoUrl, 
        file,
        fileReader.result);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  formatTrackData(track) {
    const trackObject = 
      {[track.id]: {
        "title": `${track.title}`,
        "bonus_track": `${track.bonus_track}`,
        "lyrics": `${track.lyrics}`,
        "release_date": `${track.release_date}`,
        "track_order": `${track.track_order}`
      }};
    return trackObject;
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(); 
    const albumChanged = this.props.editing.changes.albumChanged;
    const changedTrackIds = this.props.editing.changes.tracksChanged;
    if (albumChanged) {
      formData = this.fillFormData();
    }
    formData.append('album[changed]', albumChanged);
    formData.append('album[changedTrackIds]', changedTrackIds);
    const tracksChanged = this.props.editing.changes.tracksChanged;
    let changedTracks = {};
    if (tracksChanged.length > 0) {
      tracksChanged.forEach((trackId) => {
        changedTracks = merge({}, changedTracks, this.formatTrackData(this.props.editing.tracks[trackId]));
      });
    }
    formData.append('tracks', JSON.stringify(changedTracks));
    this.props.action(formData).then(() => { 
      // this.setState({ photo: this.state.photo || this.state.photoUrl, 
      //   photoFile: null, 
      //   photoUrl: null,
      //   formType: 'Update'});
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
    let editingAlbum = this.getAlbum();
    let artistString ='';
    if (editingAlbum.artist_name) {
      artistString = (
        <p>by <strong>{editingAlbum.artist_name}</strong></p>
      );
    }
    let rDate;
    let rDateString;
    if (editingAlbum.release_date.length) {
      rDate = convertDate(editingAlbum.release_date, 1);
      rDateString = convertDate(editingAlbum.release_date, 3);
    } else {
      rDate = '';
      rDateString = '';
    }
    let privateTag = '';
    if (!editingAlbum.published) {
      privateTag = (
        <p><span className="album-private">private</span></p>
      );
    }
    let coverArt;
    let coverThumb;
    if (editingAlbum.photoUrl) {
      coverArt = (
        <div className="album-image-thumb">
          <img className="album-image-1" src={editingAlbum.photoUrl} />
        </div>
      );
      coverThumb = (
        <img className="album-image-2" src={editingAlbum.photoUrl} />
      );
    } else if (editingAlbum.photo) {
      coverArt = (
        <div className="album-image-thumb">
          <img className="album-image-1" src={editingAlbum.photo} />
          <button onClick={this.deleteCoverArt.bind(this)} className="delete">X</button>
        </div>
      );
      coverThumb = (
        <img className="album-image-2" src={editingAlbum.photo} />
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
    if (!editingAlbum.published) {
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
                <input type="text" value={editingAlbum.title}
                  onChange={this.editAlbum('title')}
                  id="album-form-title" required placeholder='album name' />
              </div>
              <div className="input-wrapper">
                <div className="album-form-date">
                <label className="album-form-label" htmlFor="album-form-release-date">release date:</label>
                <input type="date" value={rDate}
                  onChange={this.editAlbum('release_date')}
                    id="album-form-release-date" /> <label className="album-form-label"> &nbsp;(optional)</label>
                </div>
              </div>
              {privateLabel}
              <div className="album-rule"></div>
              {coverArt}
              <div className="album-rule"></div>
              <div className="input-wrapper">
                <label className="album-form-label" htmlFor="album-form-artist-name">artist:</label>
                <input type="text" value={editingAlbum.artist_name}
                  onChange={this.editAlbum('artist_name')}
                  required
                  id="album-form-artist-name" />
              </div>
              <div className="input-wrapper with-textarea">
                <label className="album-form-label" htmlFor="album-form-description">about:</label>
                <textarea className="album-textarea"
                  value={editingAlbum.description}
                  onChange={this.editAlbum('description')}
                  placeholder="(optional)"
                  id="album-form-description" rows="6" />
              </div>
              <div className="album-rule"></div>
              <div className="input-wrapper">
                <label className="album-form-label" htmlFor="album-form-description">album UPC/EAN code:</label>
                <input type="text" value={editingAlbum.upc_ean}
                  onChange={this.editAlbum('upc_ean')}
                  placeholder="(optional)"
                  id="album-form-upc-ean" />
              </div>
              <div className="input-wrapper">
                <label className="album-form-label" htmlFor="album-form-catalog-number">catalog number:</label>
                <input type="text" value={editingAlbum.catalog_number}
                  onChange={this.editAlbum('catalog_number')}
                  placeholder="(optional)"
                  id="album-form-catalog-number" />
              </div>
            </form>
          </div>
          <div className="album-menu-column">
            <div className="album-title-menu">
              {coverThumb}
              <div>
                <h3 className="album-head">{editingAlbum.title || 'Untitled Album'}</h3>
                {artistString}
                {rDateString}
                {privateTag}
              </div>
            </div>
            <TracksForm />
            <div className="album-publish-menu">
              <h4 className="album-publish-head">Publish</h4>
              <ul>
                <li><input onChange={this.editAlbum('published')} 
                  type="radio" 
                  value="true" 
                  checked={String(editingAlbum.published) === "true"} /> public</li>
                <li><input onChange={this.editAlbum('published')} 
                  type="radio" 
                  value="false" 
                  checked={String(editingAlbum.published) === "false"} /> private</li>
              </ul>
            </div>
            <div className="input-wrapper">
              <input onClick={this.handleSubmit}
                type="submit" value={editingAlbum.formType}
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