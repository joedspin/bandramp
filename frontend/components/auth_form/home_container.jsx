import Home from './home';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  let proAccount;
  if (state.entities.users[state.session.id]) {
    proAccount = state.entities.users[state.session.id].pro_account;
  }
  return {
    proSignedIn: proAccount
  };
}

export default withRouter(connect(mapStateToProps)(Home));