import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist1: {
        id: '',
        videos: [],
      },
    };
    // this.displayPlaylists = this.displayPlaylists.bind(this);
    this.updatePlaylists = this.updatePlaylists.bind(this);
  }

  componentDidUpdate() {

    if(this.state.playlist1.id !== this.props.playlistItem.id) {
      this.updatePlaylists(this.props);
    }
  }

  updatePlaylists(props) {
    let playlists = this.state.playlist1.videos.slice();
    playlists.push(props.playlistItem.item);
    this.setState({ playlist1: { id: props.playlistItem.id, videos: playlists } });
  }

  displayPlaylists(event) {
    this.props.playlistItems(this.state.playlist1);
  }

  render() {
    return (
      <Col md={2}>
        <ListGroup>
          <ListGroupItem onClick={this.displayPlaylists}>Playlist 1</ListGroupItem>
          <ListGroupItem href="#">Playlist 2</ListGroupItem>
        </ListGroup>
      </Col>

    );
  }
}

export default Playlist;