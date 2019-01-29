import React from 'react';
import { Link } from 'react-router-dom';

class SplashSideFeature extends React.Component {
  render() {
    return (
      <Link className="splash-link splash-link-side" to={`/albums/${this.props.album.id}`}>
        <div className="splash-side-container">
          <img className="splash-side-image" src={this.props.album.photo} />
          <div className="splash-side-labels">
            <h3 className="splash-side-title">
              <strong>{this.props.album.title}</strong></h3>
            <p className="splash-side-subtitle">by {this.props.album.artist_name}</p>
            <p className="splash-side-linktext">LISTEN</p>
            <div className="splash-side-play"></div>
          </div>
        </div>
      </Link>
    );
  }
}

export default SplashSideFeature;