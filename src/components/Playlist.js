import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, Col, Popover, OverlayTrigger, ButtonToolbar, ControlLabel, FormControl,
  Button,
} from 'react-bootstrap';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // playlistName: '',
      // playlist1: {
      //   id: '',
      //   videos: [],
      // },
      id: '',
      playlistItems: [],
    };
    this.displayPlaylists = this.displayPlaylists.bind(this);
    this.updatePlaylists = this.updatePlaylists.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    // this.createPlaylist = this.createPlaylist.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state.playlistItems);
    console.log(this.props.playlistItem);
    this.state.playlistItems.forEach((item) => {
      console.log(item.videos);
      if(item.videos !== 0) {
        this.updatePlaylists(this.props);
      }
    });
  }

  // Update the existing playlists
  updatePlaylists(props) {
    const playlists = this.state.playlistItems.slice();
    if(this.state.playlistItems.length !== 0) {
      playlists[props.playlistItem.playlistId].videos.push(props.playlistItem.item);
    }
    console.log(playlists);
    this.setState({ playlistItems: playlists, id: props.playlistItem.playlistId });
  }

  // View the playlists added
  displayPlaylists() {
    this.props.playlistItemFunction(this.state.playlistItems);
  }

  // Creatting a new playlist
  createPlaylist() {
    const playlistItems = this.state.playlistItems.slice();
    const playlistObject = {
      name: this.playlistname.value,
      videos: [],
    };
    playlistItems.push(playlistObject);
    this.setState({ playlistItems: playlistItems });
    this.props.getNewPlaylists(playlistItems);
  }

  render() {
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
          {this.state.playlistItems.map(
            (item, index) => <ListGroupItem playlistId={index} onClick={this.displayPlaylists}>{item.name}</ListGroupItem>,
          )}
        </ListGroup>
      </Col>

    );
  }
}

export default Playlist;
