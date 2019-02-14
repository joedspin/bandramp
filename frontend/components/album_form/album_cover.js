import React from 'react';

export const CoverArtComponent = ({photoUrl, photo, ctx}) => {
  let coverArt;
  if (photoUrl) {
    coverArt = (
      <div className="album-image-thumb">
        <img className="album-image-1" src={photoUrl} />
      </div>
    );
  } else if (photo) {
    coverArt = (
      <div className="album-image-thumb">
        <img className="album-image-1" src={photo} />
        <button onClick={this.props.deleteCoverArt.bind(this)} className="delete">X</button>
      </div>
    );
  } else {
    coverArt = (
      <div className="input-wrapper">
        <label htmlFor="album-cover-art">cover art:</label>
        <input type="file"
          onChange={this.props.handleFile.bind(this)}
          id="album-cover-art" />
      </div>
    );
  }
  return coverArt;
}

export const CoverThumbComponent = ({ photoUrl, photo }) => {
  let coverThumb;
  if (photoUrl) {
    coverThumb = (
      <img className="album-image-2" src={photoUrl} />
    );
  } else if (photo) {
    coverThumb = (
      <img className="album-image-2" src={photo} />
    );
  } else {
    coverThumb = (
      <div className="album-image-blank"></div>
    );
  }
  return coverThumb;
}