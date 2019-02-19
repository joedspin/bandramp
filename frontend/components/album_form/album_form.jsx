import React from 'react';
import UserHeader from '../auth_form/user_header';
import { AlbumData, CoverThumb } from './album_form_container';
import AlbumUserIndex from './album_user_index_container';
import { convertDate } from '../../util/album_api_util';
import TracksMenu from '../track_form/tracks_menu_container';
import { TrackForm } from '../track_form/track_form_container';
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

export function privateTag(published) {
  let privateTag = '';
  if (published) {
    privateTag = <p><span className="album-private">private</span></p>
  }
  return privateTag;
}

class AlbumFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.album || BLANK_ALBUM;
    this.state.formType = this.props.formType;
    this.state.selectedPane = 0;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectPane = this.selectPane.bind(this);
  }

  componentDidMount() {
    this.props.fetchAlbums();
    if (typeof this.props.match.params.albumId !== "undefined") {
      this.props.fetchAlbum(this.props.match.params.albumId)
        .then(() => {
          this.setState(this.props.album);
          this.setState({ selectedPane: 0 });
        });
    } else {
      this.setState({ formType: 'Save Draft', selectedPane: 0 });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.albumId !== this.props.match.params.albumId) {
      if (typeof this.props.match.params.albumId === "undefined") {
        this.props.clearForm();
        this.setState({ formType: 'Save Draft', selectedPane: 0});
      } else {
        this.setState({ formType: 'Update', selectedPane: 0 });
        this.props.fetchAlbum(this.props.match.params.albumId)
          .then(() => { this.setState(this.props.album); }).then(() => {
            if (prevProps.match.path === '/albums/new') {
              this.props.clearCreatedAlbumId();
              this.setState({ formType: 'Update', selectedPane: 0 });
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
    return editingAlbum;
  }

  clearForm() {
    this.setState(BLANK_ALBUM);
  }

  editAlbum(field) {
    return (e) => {
      // e.preventDefault();
      this.props.editAlbum({ [field]: e.target.value });
    };
  }

  editAlbumPhoto(photo, photoUrl, photoFile) {
    this.props.editAlbum({
      photo: photo,
      photoUrl: photoUrl,
      photoFile: photoFile
    });
  }

  deleteCoverArt(e) {
    e.preventDefault();
    this.editAlbumPhoto('delete', '', '');
    const formData = this.fillFormData(true);
    if (this.state.formType === 'Update') {
      this.props.action(formData).then(() => { this.editAlbum({ photo: '' }); });
    }
  }

  handleFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.editAlbumPhoto(
        fileReader.result,
        fileReader.result,
        file);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
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

  formatTrackData(track) {
    const editingAlbum = this.getAlbum();
    const trackObject =
    {
      [track.id]: {
        "album_id": `${editingAlbum.id}`,
        "duration": `${track.duration}`,
        "title": `${track.title}`,
        "bonus_track": `${track.bonus_track}`,
        "lyrics": `${track.lyrics}`,
        "release_date": `${track.release_date}`,
        "track_order": `${track.track_order}`
      }
    };
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
        formData.append(`track[audio_file][${trackId}]`, this.props.editing.tracks[trackId].audioFile);
      });
    }
    formData.append('tracks', JSON.stringify(changedTracks));
    let pageAfter = `/albums/${this.props.createdAlbumId}/edit`;
    if (this.state.formType === 'Update') {
      pageAfter = "/user";
    }
    this.props.action(formData).then(() => {
      this.props.history.push(pageAfter);
    });
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

  activePane(paneId) {
    
    if (paneId === 0) {
      return (
        <AlbumData editingAlbum={this.getAlbum()} ctx={this} />
      );
    } else {
      return (
        <TrackForm trackId={paneId} ctx={this} 
        track={this.props.editing.tracks[paneId]} />
      );
    }
  }

  selectPane(paneId) {
    this.setState({selectedPane: paneId});
  }

  render() {
    let editingAlbum = this.getAlbum();
    editingAlbum.formType = this.state.formType;
    let artistString = '';
    if (editingAlbum.artist_name) {
      artistString = (
        <p>by <strong>{editingAlbum.artist_name}</strong></p>
      );
    }
    let rDateString;
    if (editingAlbum.release_date.length) {
      rDateString = convertDate(editingAlbum.release_date, 3);
    } else {
      rDateString = '';
    }
    let container = document.getElementsByClassName("album-form-container")[0];
    let container_height = "100%";
    if (container) container_height = `${container.getBoundingClientRect().height}px`;
    let tabSelected;
    this.state.selectedPane === 0 ? tabSelected = ' tab-on' : tabSelected = ' tab-off';
    return (
      <div className="album-page">
        <UserHeader theme="dark" />
        <div className='album-form-container'>
          <div className="album-info-column" style={{ height: `${container_height}` }} >
            <form className="album-form-box">
              {this.activePane(this.state.selectedPane)}
            </form>
          </div>
          <div className="album-menu-column">
            <div className={`album-title-menu${tabSelected}`} onClick={() => this.selectPane(0)}>
              <CoverThumb photo={editingAlbum.photo} photoUrl={editingAlbum.photoUrl} ctx={this} />
              <div>
                <h3 className="album-head">{editingAlbum.title || 'Untitled Album'}</h3>
                {artistString}
                {rDateString}
                {privateTag(!this.getAlbum().published)}
              </div>
            </div>
            <TracksMenu selectPane={this.selectPane} selectedPane={this.state.selectedPane} />
            <div className="album-publish-menu">
              <h4 className="album-publish-head">Publish</h4>
              <ul>
                <li><input name="album-published" 
                  onChange={this.editAlbum('published')}
                  type="radio"
                  value="true"
                  checked={String(editingAlbum.published) === "true"} /> public</li>
                <li><input name="album-published" 
                  onChange={this.editAlbum('published')}
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
        <AlbumUserIndex />
      </div>
    );
  }
}

export { AlbumFormComponent };