import React from 'react';

export const CoverArt = ({photoUrl, photo}) => {
  let coverArt = null;
  if (photoUrl) {
    coverArt = (
      <div className="album-image-thumb">
        <img className="album-image-3" src={photoUrl} />
      </div>
    );
  } else if (photo) {
    coverArt = (
      <div className="album-image-thumb">
        <img className="album-image-3" src={photo} />
      </div>
    );
  }
  return coverArt;
}

export const CoverBanner = ({ photoUrl, photo }) => {
  let coverArt = null;
  if (photoUrl) {
    coverArt = (
      <div className="album-image-banner">
        <img className="album-image-4" src={photoUrl} />
      </div>
    );
  } else if (photo) {
    coverArt = (
      <div className="album-image-banner">
        <img className="album-image-4" src={photo} />
      </div>
    );
  }
  return coverArt;
}

