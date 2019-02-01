# bandramp

[brandramp](https://bandramp.herokuapp.com/) is a single-page clone of [bandcamp] (https://bandcamp.com/), a music  platform for artists and labels to share and monetize their work and for fans to discover and enjoy it.

### Technologies
bandramp&rsqo;s frontend is dynamically generated using React, Redux, and ES6. The backed data interaction is build in Ruby on Rails with some jQuery to generate ajax requests to the Rails backend.

## Features

### User Authentication
Users can securely sign up, log in, and log out with an email address and password.

![user auth](https://github.com/joedspin/bandramp/blob/master/app/assets/images/bandramp-signup-screengrab.png?raw=true)

### Site Outline
bandramp&rsquo;s main components are:

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

A tab structure allows a data-heavy page to be visually graceful and nimble. 

### Easy UI
React and redux architecture provide a simple and intuitive interface.  The UI id present and recognizable throughout the entire application and gives users the ability to navigate to any organizational component from any other organizational component.

![ui-tags](https://github.com/BCrawfordScott/aeterNote/blob/master/%C3%A6terNote_readme_images%20/tag-index.png)
![ui-new-notebook](https://github.com/BCrawfordScott/aeterNote/blob/master/%C3%A6terNote_readme_images%20/create_notebook.png)

#### Future Features

1. Audio player
2. Artist follows
3. Robust album pages with header image and embedded lyrics and credits