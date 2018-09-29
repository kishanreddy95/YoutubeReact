import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, Col, Popover, OverlayTrigger, ButtonToolbar, ControlLabel, FormControl,
  Button,
} from 'react-bootstrap';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      playlist1: {
        id: '',
        videos: [],
      },
    };
    this.displayPlaylists = this.displayPlaylists.bind(this);
    this.updatePlaylists = this.updatePlaylists.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  componentDidUpdate() {
    if (this.state.playlist1.id !== this.props.playlistItem.id) {
      this.updatePlaylists(this.props);
    }
  }

  // Update the existing playlists
  updatePlaylists(props) {
    const playlists = this.state.playlist1.videos.slice();
    playlists.push(props.playlistItem.item);
    this.setState({ playlist1: { id: props.playlistItem.id, videos: playlists } });
  }

  // View the playlists added
  displayPlaylists() {
    this.props.playlistItemFunction(this.state.playlist1);
  }

  // Creatting a new playlist
  createPlaylist() {
    // this.setState({ playlistName: this.playlistname.value });
    const list = document.getElementById('list-of-playlists');
    console.log(list)
    const toAppend = <ListGroupItem onClick={this.displayPlaylists}>{this.playlistname.value}</ListGroupItem>;
    list.appendChild(toAppend);
  }

  render() {
    console.log(this.state.playlistName);
    const createPlaylistPopover = (
      <Popover id="popover-positioned-bottom" title="Enter Name for Playlist">
        <ControlLabel>Name</ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter text"
          inputRef={(input) => { this.playlistname = input; }}
        />
        <br />
        <Button bsStyle="primary" type="submit" onClick={this.createPlaylist}>Create</Button>
      </Popover>
    );
    return (
      <Col md={2}>
        <ListGroup>
          <ButtonToolbar>
            <OverlayTrigger trigger="click" placement="bottom" overlay={createPlaylistPopover}>
              <ListGroupItem>Create a Playlist</ListGroupItem>
            </OverlayTrigger>
          </ButtonToolbar>
        </ListGroup>
        <ListGroup id="list-of-playlists">
          <ListGroupItem onClick={this.displayPlaylists}>Playlist 1</ListGroupItem>
          <ListGroupItem href="#">Playlist 2</ListGroupItem>
        </ListGroup>
      </Col>

    );
  }
}

export default Playlist;
