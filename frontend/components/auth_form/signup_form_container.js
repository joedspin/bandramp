import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  SignupForm from './signup_form';
import { signup, clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Sign Up',
    navLink: <p>Already have an account? <Link to="/login">Log in.</Link></p>
  };
};

const mapDispatchToProp = dispatch => {
  return {
    action: (user) => dispatch(signup(user)),
    clearErrors: () => dispatch(clearSessionErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(SignupForm);