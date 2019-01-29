import SplashFeatureList from './splash';
import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions/album_actions';
import { sampleSize } from 'lodash';

const mapStateToProps = (state) => {
  const publicAlbums = [];
  let bigFeature;
  let sideFeatures = [];
  let sideFeatureId;
  if (Object.keys(state.entities.albums).length !== 0) {
    Object.keys(state.entities.albums).forEach((albumId) => {
      if (state.entities.albums[albumId].published && state.entities.albums[albumId].photo) {
        publicAlbums.push(state.entities.albums[albumId]);
      }
    });
    sideFeatures = sampleSize(publicAlbums, 4);
    bigFeature = sideFeatures[0];
    delete sideFeatures[0];
  }
  return {
    bigFeature,
    sideFeatures
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashFeatureList);