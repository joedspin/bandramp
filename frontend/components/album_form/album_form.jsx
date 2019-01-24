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
          <form onSubmit={this.handleSubmit} className="login-form-box">
            <div className="input-wrapper">
              <label htmlFor="artist-form-username">Username</label>
              <input type="text" value={this.state.username}
                onChange={this.update('username')}
                id="artist-form-username" disabled={this.state.disabled} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="artist-form-password">Password</label>
              <input type="password" value={this.state.password}
                onChange={this.update('password')}
                id="artist-form-password" disabled={this.state.disabled} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="artist-form-submit">&nbsp;</label>
              <input type="submit" value={this.props.formType}
                id="artist=form-submit" />
            </div>
            {this.props.navLink}
          </form>
        </div>
      </div>
    );
  }
}

export default AlbumForm;