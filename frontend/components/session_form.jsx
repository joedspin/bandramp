import React from 'react';

class SessionForm extends React.Component {
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
      <div class='login-form-container'>
        <h2 class="form-head">Sign Up for an Artist Account</h2>
        <div class="top-rule"></div>
        <form onSubmit={this.handleSubmit} class="login-form-box">
          <label for="artist-form-username">Username
          <input type="text" value={this.state.username} 
            onUpdate={this.update('username')} 
            name="artist-form-username" /></label>
          <label for="artist-form-password">Password
            <input type="text" value={this.state.username} 
            onUpdate={this.update('username')} 
            name="artist-form-password" /></label>
          <label for="artist-form-email">Email
            <input type="text" value={this.state.email}
              onUpdate={this.update('email')}
              name="artist-form-email" /></label>
          <label for="artist-form-email-confirm">Confirm email
            <input type="text" value={this.state.emailConfirm}
              onUpdate={this.update('emailConfirm')}
              name="artist-form-email-confirm" /></label>
          <input type="submit" value={this.state.formType} />
        </form>
        {navLilnk}
      </div>
    );
  }
}

export default SessionForm;