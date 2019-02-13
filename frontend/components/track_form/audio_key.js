import React from 'react';

const AudioKey = (track, deleteAudio) => {
  const { audioUrl } = track;
  const { audio_file } = track;
  const { audio_size } = track;
  
  let audioFile;
  if (audioUrl) {
    audioFile = (
      <div className="audio-file">track ready to load</div>
    );
  } else if (audio_file) {
    audioFile = (
      <div className="audio-file">{audio_size}
        track loaded
        <button onClick={deleteAudio.bind(this)} className="delete">X</button>
      </div>
    );
  } else {
    audioFile = (
      <div className="audio-file"></div>
    );
  }
  return audioFile;
};

export default AudioKey;