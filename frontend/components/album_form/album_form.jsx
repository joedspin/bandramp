import React from 'react';
import UserHeader from '../auth_form/user_header';

class AlbumForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.album;
    this.handleSubmit = this.handleSubmit.bind(this);
    if (this.state.title === '') {
      this.state.titleDisplay = 'Untitled Album';
    } else {
      this.state.titleDisplay = this.state.title;
    }
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="album-page">
        <UserHeader />
        <div className='album-form-container'>
          <h2 className="form-head">{this.state.titleDisplay}</h2>
          <form onSubmit={this.handleSubmit} className="album-form-box">
            <div className="input-wrapper">
              <label htmlFor="album-form-title">*</label>
              <input type="text" value={this.state.title}
                onChange={this.update('title')}
                id="album-form-title" required placeholder='album name' />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-release-date">release date:</label>
              <input type="text" value={this.state.releaseDate}
                onChange={this.update('releaseDate')}
                id="album-form-release-date" /> mm/dd/yyyy
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-artist-name">artist:</label>
              <input type="text" value={this.state.artistName}
                onChange={this.update('artistName')}
                id="album-form-artist-name" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-description">about:</label>
              <input type="text" value={this.state.description}
                onChange={this.update('description')}
                id="album-form-description" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-description">album UPC/EAN code:</label>
              <input type="text" value={this.state.upcEan}
                onChange={this.update('upcEan')}
                id="album-form-upc-ean" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="album-form-catalog-number">catalog number:</label>
              <input type="text" value={this.state.catalogNumber}
                onChange={this.update('catalogNumber')}
                id="album-form-catalog-number" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="artist-form-submit">&nbsp;</label>
              <input type="submit" value={this.state.formType}
                id="artist=form-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AlbumForm;