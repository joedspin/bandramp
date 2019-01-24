import React from 'react';
import AuthHeader from './auth_header';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.demoCredentials) {
      this.state = {
        username: `${this.props.demoCredentials.username}`,
        password: `${this.props.demoCredentials.password}`,
        disabled: true
      };
    } else {
      this.state = {
        username: '',
        password: '',
        disabled: false
      };
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state).then();
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
          <h2 className="form-head">Log in</h2>
          <div className="top-rule"></div>
          <form onSubmit={this.handleSubmit} className="login-form-box">
            <div className="input-wrapper">
              <label htmlFor="artist-form-username">Username</label>
              <input type="text" value={this.state.username} 
                onChange={this.update('username')} 
                id="artist-form-username" disabled={this.state.disabled}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="artist-form-password">Password</label>
                <input type="password" value={this.state.password} 
                onChange={this.update('password')} 
                id="artist-form-password" disabled={this.state.disabled}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="artist-form-submit">&nbsp;</label>
                <input type="submit" value={this.props.formType} 
                id="artist=form-submit" />
            </div>
            {this.renderErrors()}
            {this.props.navLink}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;