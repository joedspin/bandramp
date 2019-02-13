import React from 'react';

export const CoverArt = ({photoUrl, photo, ctx}) => {
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
        <button onClick={ctx.deleteCoverArt.bind(ctx)} className="delete">X</button>
      </div>
    );
  } else {
    coverArt = (
      <div className="input-wrapper">
        <label htmlFor="album-cover-art">cover art:</label>
        <input type="file"
          onChange={ctx.handleFile.bind(ctx)}
          id="album-cover-art" />
      </div>
    );
  }
  return coverArt;
}

export const CoverThumb = ({ photoUrl, photo, ctx }) => {
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