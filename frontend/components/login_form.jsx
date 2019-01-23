import React from 'react';
import AuthHeader from './auth_header';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e) {
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
      <AuthHeader />
      <div className='login-form-container'>
        <h2 className="form-head">Log in</h2>
        <div className="top-rule"></div>
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <label htmlFor="artist-form-username">Username
          <input type="text" value={this.state.username} 
            onChange={this.update('username')} 
            name="artist-form-username" /></label>
          <label htmlFor="artist-form-password">Password
            <input type="password" value={this.state.password} 
            onChange={this.update('password')} 
            name="artist-form-password" /></label>
          <input type="submit" value={this.props.formType} />
        </form>
        {this.props.navLink}
      </div>
    );
  }
}

export default LoginForm;