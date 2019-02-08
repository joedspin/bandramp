import React from 'react';

export const FeatureKey = ({ track_order }) => {
  let featureTag;
  if (track_order === 1) {
    featureTag = <div className="track-feature-on"></div>
  } else {
    featureTag = <div className="track-feature-off"></div>
  }
  return featureTag;
};

export const FeatureDescription = ({ track_order }) => {
  let featureDescription = '';
  if (track_order === 1) {
    featureDescription = (
      <div className="track-feature-description">
        <strong>Featured: </strong>
        this is the track that will be cued up when fans visit or embed the&nbsp;
        album, and it's also the track that will play in Discover.
      </div>
    );
  }
  return featureDescription;
};

