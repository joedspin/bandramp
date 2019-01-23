import React from 'react';

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
    this.props.action(this.state);
  }

  renderErrors() {

  }

  render() {
    return (
      <div className='login-form-container'>
        <h2 className="form-head">Sign Up for an Artist Account</h2>
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
          <label htmlFor="artist-form-email">Email
            <input type="text" value={this.state.email}
              onChange={this.update('email')}
              name="artist-form-email" /></label>
          <label htmlFor="artist-form-email-confirm">Confirm email
            <input type="text" value={this.state.emailConfirm}
              onChange={this.update('emailConfirm')}
              name="artist-form-email-confirm" /></label>
          <input type="submit" value={this.props.formType} />
        </form>
        {this.props.navLink}
      </div>
    );
  }
}

export default SignupForm;