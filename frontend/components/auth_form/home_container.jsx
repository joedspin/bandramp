import Home from './home';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    proSignedIn: state.user[state.session.id].pro_account
  };
}

export default withRouter(connect(mapStateToProps)(Home));