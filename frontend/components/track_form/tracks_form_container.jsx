
import { connect } from 'react-redux';
import TracksForm from './tracks_form';

const mapStateToProps = (state) => {
  return {
    tracks: state.editing.tracks || {}
  };
};

export default connect(mapStateToProps)(TracksForm);