import Home from './home';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  let proAccount;
  let signedIn = false;
  if (state.entities.users[state.session.id]) {
    proAccount = state.entities.users[state.session.id].pro_account;
    signedIn = true;
  }
  return {
    proSignedIn: proAccount,
    signedIn: signedIn
  };
}

export default withRouter(connect(mapStateToProps)(Home));