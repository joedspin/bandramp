import React from 'react';
import AuthHeader from './auth_header';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      emailConfirm: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
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
    return (
      <div className="auth-page">
        <AuthHeader />
        <div className='login-form-container'>
          <h2 className="form-head">Sign Up for a Label Account</h2>
          <div className="top-rule"></div>
          <form onSubmit={this.handleSubmit} className="login-form-box">
            <div className="input-wrapper">
              <label htmlFor="artist-form-username">Username</label>
              <input type="text" value={this.state.username} 
                onChange={this.update('username')} 
                id="artist-form-username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="artist-form-password">Password</label>
                <input type="password" value={this.state.password} 
                onChange={this.update('password')} 
              id="artist-form-password" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="artist-form-email">Email</label>
                <input type="text" value={this.state.email}
                  onChange={this.update('email')}
              id="artist-form-email" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="artist-form-email-confirm">Confirm email</label>
                <input type="text" value={this.state.emailConfirm}
                  onChange={this.update('emailConfirm')}
                  id="artist-form-email-confirm" />
              <input type="submit" value={this.props.formType} />
            </div>
            {this.renderErrors()}
            {this.props.navLink}
          </form>
        </div>
      </div>
    );
  }
}

export default SignupForm;