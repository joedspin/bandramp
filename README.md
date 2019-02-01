![bandramp logo](https://github.com/joedspin/bandramp/blob/master/app/assets/images/bandramp-logo.png)

[brandramp](https://bandramp.herokuapp.com/) is a single-page clone of [bandcamp](https://bandcamp.com/), a music  platform for artists and labels to share and monetize their work and for fans to discover and enjoy it.

### Technologies
bandramp’s frontend is dynamically generated using React, Redux, and ES6. The backed data interaction is build in Ruby on Rails with some jQuery to generate ajax requests to the Rails backend.

## Features

### User Authentication
Users can securely sign up, log in, and log out with an email address and password.

![user auth](https://github.com/joedspin/bandramp/blob/master/app/assets/images/bandramp-signup-screengrab.png)

### Site Outline
bandramp’s main components are:

1. Splash Page
  - Highlights four albums
  - Carousel of recent additions
2. Label admin
  - Pro users can add and edit album content
  - Easy-to-user interface for providing robust song and album details
  - Media assets hosted on amazon S3
  - Complex data structure managed through custom Redux state

### Asset Manager
bandramp uses a single-page admin page for album content that allows pro users to upload images and audio files as well as edit fine-grained details for the artistic works. 

A tab structure on the frontend allows a data-heavy page to be visually graceful, nimble, and intuitive. React and Redux architecture keeps the administrator on on page while working on the asset.

![asset manager](https://github.com/joedspin/bandramp/blob/master/app/assets/images/bandramp-album-edit-screengrab.png)

### Efficient Data Handling

By managing the data-heavy album information in the Redux state, bandramp efficiently passes back to the server only those data records that have been added or modified by the user during each page session.

```handleSubmit(e) {
  e.preventDefault();
  let formData = new FormData(); 
  const albumChanged = this.props.editing.changes.albumChanged;
  const changedTrackIds = this.props.editing.changes.tracksChanged;
  if (albumChanged) {
    formData = this.fillFormData();
  }
  formData.append('album[changed]', albumChanged);
  formData.append('album[changedTrackIds]', changedTrackIds);
  const tracksChanged = this.props.editing.changes.tracksChanged;
  let changedTracks = {};
  if (tracksChanged.length > 0) {
    tracksChanged.forEach((trackId) => {
      changedTracks = merge({}, changedTracks, this.formatTrackData(this.props.editing.tracks[trackId]));
    });
  }
  formData.append('tracks', JSON.stringify(changedTracks));
  this.props.action(formData);
  }```

Nested track details bundled up into a custom object-like strcture and passed back using `JSON.stringify` to be reassembled on the backed with `JSON.parse`.

```formatTrackData(track) {
    const editingAlbum = this.getAlbum();
    const trackObject = 
      {[track.id]: {
        "album_id": `${editingAlbum.id}`,
        "title": `${track.title}`,
        "bonus_track": `${track.bonus_track}`,
        "lyrics": `${track.lyrics}`,
        "release_date": `${track.release_date}`,
        "track_order": `${track.track_order}`
      }};
    return trackObject;
  }```

#### Future Features

1. Audio players and additional data points for tracks
2. Artist follows
3. Robust album pages with header image and embedded lyrics and credits