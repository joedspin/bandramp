import React from 'react';

class UserLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }
  
  setRedirect() {
    this.setState({ redirect: true });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to={`/albums/${this.props.albumId}/edit`} />;
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <button name="album-edit-button" onClick={this.setRedirect}>EDIT</button>
      </div>
    );
  }
}

export default UserLinks;