import React from 'react';
import SplashSideFeature from './splash_side';
import { Link } from 'react-router-dom';

class SplashFeatureList extends React.Component {

  componentDidMount() {
    this.props.fetchAlbums();
  }

  render() {
    let splashBigFeature;
    if (this.props.bigFeature) {
      splashBigFeature = (
        <Link className="splash-link" to={`/albums/${this.props.bigFeature.id}`}>
          <div classname="splash-big-container">
            <img className="splash-big-image" src={this.props.bigFeature.photo} />
            <div className="splash-big-labels">
              <h3 className="splash-big-title">
                <strong>{this.props.bigFeature.title}</strong></h3>
              <p className="splash-big-subtitle">by {this.props.bigFeature.artist_name}</p>
              <p className="splash-big-linktext">listen</p>
            </div>
          </div>
        </Link>
      );
    }
    const splashSideFeatures = [];    
    this.props.sideFeatures.forEach((album) => {
      splashSideFeatures.push(
        <SplashSideFeature
          key={album.id}
          album={album} />
      );
    });
    return (
      <div>
        <div className="splash-box">
          <div className="splash-big-feature">
            {splashBigFeature}
          </div>
          <div className="splash-side-feature">
            {splashSideFeatures}
          </div>
        </div>
      </div>
    );
  }
}

export default SplashFeatureList;