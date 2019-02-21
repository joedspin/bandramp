import React from 'react';
import AuthHeader from './auth_header';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.demoCredentials) {
      this.state = {
        username: `${this.props.demoCredentials.username}`,
        password: `${this.props.demoCredentials.password}`,
        disabled: true
      };
      this.props.action(this.state);
    } else {
      this.state = {
        username: '',
        password: '',
        disabled: false
      };
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.demoCredentials) {
      this.props.clearErrors();
    }
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
    const submitEnable = this.state.username.length > 0 && this.state.password.length > 0;
    return (
      <div className="auth-page">
        <AuthHeader theme="light" />
        <div className="auth-page-content">
          <div className='login-form-container'>
            <h2 className="form-head">Log in</h2>
            <div className="top-rule"></div>
            <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="input-wrapper">
                <label htmlFor="login-form-username">Username</label>
                <input type="text" value={this.state.username} 
                  onChange={this.update('username')} required
                  id="login-form-username" disabled={this.state.disabled}/>
              </div>
              <div className="input-wrapper">
                <label htmlFor="login-form-password">Password</label>
                  <input type="password" value={this.state.password} 
                  onChange={this.update('password')} 
                  id="login-form-password" disabled={this.state.disabled}/>
              </div>
              <div className="input-wrapper">
                <label htmlFor="login-form-submit">&nbsp;</label>
                  <input type="submit" value={this.props.formType} 
                  id="login-form-submit" disabled={!submitEnable} />
              </div>
              <div className="demo-login-link">
                <Link to="/login/demo"><span className="head-highlight">Demo log in!</span></Link>
              </div>
              {this.renderErrors()}
              {this.props.navLink}
            </form>
          </div>
          <div className="auth-footer">
            
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;