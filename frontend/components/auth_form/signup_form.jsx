import React from 'react';
import AuthHeader from './auth_header';
import { Link } from 'react-router-dom'

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

  componentDidMount() {
    this.props.clearErrors();
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
    const submitEnable = 
      this.state.username.length > 0 && 
      this.state.password.length > 0 &&
      this.state.email.length > 0 &&
      this.state.emailConfirm.length > 0;
    return (
      <div className="auth-page">
        <AuthHeader theme="" />
        <div className="auth-page-content">
          <div className='login-form-container'>
            <h2 className="form-head">Sign up for Label account</h2>
            <div className="top-rule"></div>
            <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="input-wrapper">
                <label htmlFor="login-form-username">Username</label>
                <input type="text" value={this.state.username} 
                  onChange={this.update('username')} 
                  id="login-form-username" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="login-form-password">Password</label>
                  <input type="password" value={this.state.password} 
                  onChange={this.update('password')} 
                id="login-form-password" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="login-form-email">Email</label>
                  <input type="text" value={this.state.email}
                    onChange={this.update('email')}
                id="login-form-email" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="login-form-email-confirm">Confirm email</label>
                  <input type="text" value={this.state.emailConfirm}
                    onChange={this.update('emailConfirm')}
                    id="login-form-email-confirm" />
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

export default SignupForm;