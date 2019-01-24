import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from './login_form';
import { login } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Log in',
    navLink: <p>Don’t have an account? Sign up as a&nbsp;
      <Link to="/signup">fan</Link>, an&nbsp;
      <Link to="/signup">artist</Link> or a&nbsp;
      <Link to="/signup">label</Link>.</p>,
    demoCredentials: {username: 'demouser', password: 'demouserpassword'}
  };
};

const mapDispatchToProp = dispatch => {
  return {
    action: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(LoginForm);