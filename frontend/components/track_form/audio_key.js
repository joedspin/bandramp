import React from 'react';

const AudioKey = (track) => {
  const { audioUrl } = track.track;
  const { audio_file } = track.track;
  const { audio_size } = track.track;
  let audioFile;
  if (audioUrl) {
    audioFile = (
      <div className="audio-file">track ready to load</div>
    );
  } else if (audio_file) {
    audioFile = (
      <div className="audio-file">{audio_size}</div>
    );
  } else {
    audioFile = (
      <div className="audio-file"></div>
    );
  }
  return audioFile;
};

export default AudioKey;